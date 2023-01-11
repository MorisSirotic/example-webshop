package com.moris.webshop.frontend.security;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.moris.webshop.backend.security.payload.request.LoginRequest;
import com.moris.webshop.backend.security.payload.response.JwtResponse;
import com.moris.webshop.backend.security.payload.response.MessageResponse;
import com.moris.webshop.common.AuthenticationType;
import com.moris.webshop.common.Customer;
import com.moris.webshop.common.Utility;
import com.moris.webshop.common.service.SettingService;
import com.moris.webshop.common.setting.EmailSettingBag;
import com.moris.webshop.frontend.customer.CustomerNotFoundException;
import com.moris.webshop.frontend.customer.CustomerService;
import com.moris.webshop.frontend.security.jwt.JwtUtils;

import net.minidev.json.JSONObject;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class CustomerAuthController {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private SettingService settingService;

	@Autowired
	private DaoAuthenticationProvider authenticationProvider;

	@Autowired
	private JwtUtils jwtUtils;

	/*
	 * @PostMapping("/signin") public ResponseEntity<?>
	 * authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
	 * HttpServletRequest request) {
	 * 
	 * 
	 * Authentication authentication = authenticationProvider.authenticate( new
	 * UsernamePasswordAuthenticationToken(loginRequest.getEmail().toLowerCase(),
	 * loginRequest.getPassword()));
	 * 
	 * CustomerUserDetails userDetails = (CustomerUserDetails)
	 * authentication.getPrincipal(); Customer customer = userDetails.getCustomer();
	 * 
	 * customerService.updateAuthenticationType(customer,
	 * AuthenticationType.DATABASE);
	 * 
	 * SecurityContextHolder.getContext().setAuthentication(authentication); String
	 * jwt = jwtUtils.generateJwtToken(authentication);
	 * 
	 * return ResponseEntity.ok(new JwtResponse(jwt, customer.getId(),
	 * customer.getEmail())); // return ResponseEntity.ok("Okay"); }
	 */

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
			HttpServletRequest request) {

		Authentication authentication = authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequest.getEmail().toLowerCase(), loginRequest.getPassword()));

		CustomerUserDetails userDetails = (CustomerUserDetails) authentication.getPrincipal();
		Customer customer = userDetails.getCustomer();

		customerService.updateAuthenticationType(customer, AuthenticationType.DATABASE);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		return ResponseEntity.ok(new JwtResponse(jwt, customer.getId(), customer.getEmail()));

		// return ResponseEntity.ok("Okay");
	}

	@PostMapping(value = { "/signup" })
	public ResponseEntity<String> registerUser(HttpServletRequest request, @RequestBody Customer customer)
			throws UnsupportedEncodingException, MessagingException {
		customer.setEmail(customer.getEmail().toLowerCase());
		EmailValidator validator = new EmailValidator();
		boolean emailValid = validator.isValid(customer.getEmail(), null);

		if (customer.getPassword().length() < 6) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password must be more than 5 characters long");
		}

		if (!emailValid) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email contains illegal character(s)");
		}

		Customer cust = customerService.getCustomerByEmail(customer.getEmail());
		if (cust != null) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email aready exists");
		}
		
		
		customer.setEnabled(true);
		customerService.registerCustomer(customer);
		sendVerificationEmail(request, customer);
		return ResponseEntity.ok(customer.getEmail());
	}

	private void sendVerificationEmail(HttpServletRequest request, Customer customer)
			throws UnsupportedEncodingException, MessagingException {

		EmailSettingBag emailSettings = settingService.getEmailSettings();
		JavaMailSenderImpl mailSender = Utility.prepareMailSender(emailSettings);

		String toAddress = customer.getEmail();
		String subject = emailSettings.getCustomerVerifySubject();
		String content = emailSettings.getCustomerVerifyContent();

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom(emailSettings.getFromAddress(), emailSettings.getSenderName());
		helper.setTo(toAddress);
		helper.setSubject(subject);

		content = content.replace("[[name]]", customer.getFullName());

		String verifyURL = Utility.getSiteURL(request) + "/verify?code=" + customer.getVerificationCode();

		content = content.replace("[[URL]]", verifyURL);

		helper.setText(content, true);

		mailSender.send(message);

		
		
	}

	@GetMapping("/verify")
	public ResponseEntity<String> verifyAccount(String code) {
		// boolean verified = customerService.verify(code);

		boolean verified = customerService.fakeVerify(code);
		return ResponseEntity.ok(verified ? "Verified Successfully" : "Token Expired");
	}

	private Customer getAuthenticatedCustomer(HttpServletRequest request) throws CustomerNotFoundException {
		String email = Utility.getEmailOfAuthenticatedCustomer(request);
		if (email == null) {
			throw new CustomerNotFoundException("Not an authenticated customer");
		}

		return customerService.getCustomerByEmail(email);
	}

	private void sendTestMail(HttpServletRequest request) throws UnsupportedEncodingException, MessagingException {

		EmailSettingBag emailSettings = settingService.getEmailSettings();
		JavaMailSenderImpl mailSender = Utility.prepareMailSender(emailSettings);

		String toAddress = "moris.sirotic1@gmail.com";
		String subject = emailSettings.getCustomerVerifySubject();
		String content = emailSettings.getCustomerVerifyContent();

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom(emailSettings.getFromAddress(), emailSettings.getSenderName());
		helper.setTo(toAddress);
		helper.setSubject(subject);

		content = content.replace("[[name]]", "Mister");

		String verifyURL = Utility.getSiteURL(request) + "/verify?code=" + "randmomcode112234345";

		content = content.replace("[[URL]]", verifyURL);

		helper.setText(content, true);

		mailSender.send(message);
		
		
		
	}

	@PostMapping()
	public ResponseEntity<String> resetPassword(String email) {

		return ResponseEntity.ok("test");
	}

	@PostMapping("/sendConfirmationEmail")
	public ResponseEntity<String> testMail(HttpServletRequest request)
			throws UnsupportedEncodingException, MessagingException {

		sendTestMail(request);

		return ResponseEntity.ok("test");

	}

	@GetMapping(value = { "/customer" })
	public ResponseEntity<?> getUser(@Valid HttpServletRequest request) {

		Customer customer = null;

		
		try {
			customer = getAuthenticatedCustomer(request);
		} catch (CustomerNotFoundException e) {
			// TODO Auto-generated catch block
			// new CustomerNotFoundException("Not found");
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login custom message");

			// e.printStackTrace();
		}
		return ResponseEntity.ok(customer);
	}

	@PostMapping("/forgot_password")
	public ResponseEntity<?> processRequestForm(HttpServletRequest request) {

		String email = request.getParameter("email").toLowerCase();
		

		if (customerService.getCustomerByEmail(email) == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("That email doesn't exist.");
		}
		try {
			String token = customerService.updateResetPasswordToken(email);
			String link = Utility.getSiteURL(request) + "/reset_password?token=" + token;
			sendPasswordResetEmail(link, email);

		} catch (CustomerNotFoundException e) {

		} catch (UnsupportedEncodingException | MessagingException e) {

		}

		return ResponseEntity.ok("");
	}

	@PostMapping("/reset_password")
	public ResponseEntity<?> processResetForm(HttpServletRequest request) {
		String token = request.getParameter("token").replace("token=", "");

		String password = request.getParameter("password");

		try {
			customerService.updatePassword(token, password);

		} catch (CustomerNotFoundException e) {

			return ResponseEntity.status(HttpStatus.IM_USED).body("Invalid Token");
		}

		return ResponseEntity.ok("");
	}

	private void sendPasswordResetEmail(String link, String email)
			throws UnsupportedEncodingException, MessagingException {
		EmailSettingBag emailSettings = settingService.getEmailSettings();
		JavaMailSenderImpl mailSender = Utility.prepareMailSender(emailSettings);

		String toAddress = email;
		String subject = "Here's the link to reset your password";

		String content = "<p>Hello,</p>" + "<p>You have requested to reset your password.</p>"
				+ "Click the link below to change your password:</p>" + "<p><a href=\"" + link
				+ "\">Change my password</a></p>" + "<br>" + "<p>Ignore this email if you do remember your password, "
				+ "or you have not made the request.</p>";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom(emailSettings.getFromAddress(), emailSettings.getSenderName());
		helper.setTo(toAddress);
		helper.setSubject(subject);

		helper.setText(content, true);
		mailSender.send(message);
	}

}
