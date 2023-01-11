//package com.moris.webshop.backend.controller;
//
//import java.util.HashSet;
//
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import javax.validation.Valid;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.moris.webshop.backend.repository.CustomerRepository;
//import com.moris.webshop.backend.repository.RoleRepository;
//import com.moris.webshop.backend.repository.UserRepository;
//import com.moris.webshop.backend.security.jwt.JwtUtils;
//import com.moris.webshop.backend.security.payload.request.LoginRequest;
//import com.moris.webshop.backend.security.payload.request.SignupRequest;
//import com.moris.webshop.backend.security.payload.response.JwtResponse;
//import com.moris.webshop.backend.security.payload.response.MessageResponse;
//import com.moris.webshop.backend.security.services.UserDetailsImpl;
//import com.moris.webshop.common.Customer;
//import com.moris.webshop.common.Role;
//import com.moris.webshop.common.User;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
//public class AuthController {
//	@Autowired
//	AuthenticationManager authenticationManager;
//	@Autowired
//	UserRepository userRepository;
//	@Autowired
//	CustomerRepository customerRepository;
//	@Autowired
//	RoleRepository roleRepository;
//	@Autowired
//	PasswordEncoder encoder;
//	@Autowired
//	JwtUtils jwtUtils;
//
//	@PostMapping("/signin")
//	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//		Authentication authentication = authenticationManager.authenticate(
//				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//		String jwt = jwtUtils.generateJwtToken(authentication);
//
//		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//
//		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
//				.collect(Collectors.toList());
//
//
//		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(), roles));
//	}
//
//	@PostMapping(value = { "/signup" })
//	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
//		
//
//		
//		
//
//		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
//			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
//		}
//		// Create new user's account
//		User user = new User(signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));
//		user.setFirstName(signUpRequest.getFirstName());
//		user.setLastName(signUpRequest.getLastName());
//		
////		user.setCity(signUpRequest.getCity());
////		user.setAddress(signUpRequest.getAddress());
////		user.setPostalCode(signUpRequest.getPostalCode());
//		
////		Customer customer = new Customer(signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));
////		customer.setFirstName(signUpRequest.getFirstName());
////		customer.setLastName(signUpRequest.getLastName());
////		customer.setCity(signUpRequest.getCity());
////		customer.setAddressLine1(signUpRequest.getAddress());
////		customer.setAddressLine2(signUpRequest.getAddress());
////		customer.setCountry("Croatia");
////		customer.setState(signUpRequest.getState());
//
////		List<Role> strRoles = signUpRequest.getRoles();
//
//		Set<Role> roles = new HashSet<>();
//
//		
//		
//		Role customerRole = roleRepository.findByName("Customer").orElseThrow();
//		roles.add(customerRole);
//		
//		//TODO: Uncomment later. For now the Admin UI won't be implemented so all registrations are customers.
////		strRoles.forEach(child -> {
////
////			Role newRole = roleRepository.findByName(child.getName()).orElseThrow();
////
////			roles.add(newRole);
////
////		});
//
//		user.setRoles(roles);
//
//		userRepository.save(user);
//		//customerRepository.save(customer);
//
//		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
//	}
//}
