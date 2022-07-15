package com.moris.webshop.frontend.customer;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.moris.webshop.backend.repository.CountryRepository;
import com.moris.webshop.backend.repository.CustomerRepository;
import com.moris.webshop.common.AuthenticationType;
import com.moris.webshop.common.Customer;

import net.bytebuddy.utility.RandomString;

@Service
@Transactional
public class CustomerService {

	@Autowired
	private CountryRepository countryRepo;

	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public boolean isEmailUnique(String email) {
		Customer customer = customerRepo.findByEmail(email);
		return customer == null;
	}

	public Customer registerCustomer(Customer customer) {
		encodePassword(customer);
		
		//TODO: SET TO FALSE
		customer.setEnabled(true);
		customer.setCreatedTime(new Date());

		String randomCode = RandomString.make(64);
		customer.setVerificationCode(randomCode);

		customerRepo.save(customer);
		return customer;

	}

	public Customer getCustomerByEmail(String email) {
		return customerRepo.findByEmail(email);
	}

	public void updateCustomer(Customer newCust) {
	Customer original =	customerRepo.findByEmail(newCust.getEmail());
	newCust.setId(original.getId());
	original = newCust;
	
	customerRepo.save(original);
		
	}
	
	private void encodePassword(Customer customer) {
		String encodedPassword = passwordEncoder.encode(customer.getPassword());
		customer.setPassword(encodedPassword);
	}

	public boolean verify(String verificationCode) {
		Customer customer = customerRepo.findByVerificationCode(verificationCode);

		if (customer == null || customer.isEnabled()) {
			return false;
		} else {
			customerRepo.enable(customer.getId());
			return true;
		}
	}
	
	public boolean fakeVerify(String verificationCode) {
		Customer customer = customerRepo.findByVerificationCode(verificationCode);

		if (customer == null) {
			return false;
		} else {
			return true;
		}
	}

	public void updateAuthenticationType(Customer customer, AuthenticationType type) {
		if (!customer.getAuthenticationType().equals(type)) {
			customerRepo.updateAuthenticationType(customer.getId(), type);
		}
	}

	public void addNewCustomerUponOAuthLogin(String name, String email, String countryCode,
			AuthenticationType authenticationType) {
		Customer customer = new Customer();
		customer.setEmail(email);
		setName(name, customer);

		customer.setEnabled(true);
		customer.setCreatedTime(new Date());
		customer.setPassword("");
		customer.setAddressLine1("");
		customer.setAddressLine2("");
		customer.setCity("");
		customer.setState("");
		customer.setPhoneNumber("");
		customer.setPostalCode("");

		customerRepo.save(customer);
	}

	private void setName(String name, Customer customer) {
		String[] nameArray = name.split(" ");
		if (nameArray.length < 2) {
			customer.setFirstName(name);
			customer.setLastName("");
		} else {
			String firstName = nameArray[0];
			customer.setFirstName(firstName);

			String lastName = name.replaceFirst(firstName + " ", "");
			customer.setLastName(lastName);
		}
	}

	public void update(Customer customerInForm) {
		Customer customerInDB = customerRepo.findById(customerInForm.getId()).get();

		customerInForm.setPassword(customerInDB.getPassword());

		customerInForm.setEnabled(customerInDB.isEnabled());
		customerInForm.setCreatedTime(customerInDB.getCreatedTime());
		customerInForm.setVerificationCode(customerInDB.getVerificationCode());
		customerInForm.setResetPasswordToken(customerInDB.getResetPasswordToken());

		customerRepo.save(customerInForm);
	}

	public String updateResetPasswordToken(String email) throws CustomerNotFoundException {
		Customer customer = customerRepo.findByEmail(email);
		if (customer != null) {
			String token = RandomString.make(30);
			customer.setResetPasswordToken(token);
			customerRepo.save(customer);

			return token;
		} else {
			throw new CustomerNotFoundException("Could not find any customer with the email " + email);
		}
	}

	public Customer getByResetPasswordToken(String token) {
		return customerRepo.findByResetPasswordToken(token);
	}

	public void updatePassword(String token, String newPassword) throws CustomerNotFoundException {
		Customer customer = customerRepo.findByResetPasswordToken(token);
		
		if (customer == null) {
			
			throw new CustomerNotFoundException("No customer found: invalid token");
		}

		customer.setPassword(newPassword);
		customer.setResetPasswordToken(null);
		encodePassword(customer);

		customerRepo.save(customer);
	}
}
