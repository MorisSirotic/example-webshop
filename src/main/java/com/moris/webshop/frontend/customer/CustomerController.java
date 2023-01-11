package com.moris.webshop.frontend.customer;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.backend.repository.CustomerRepository;
import com.moris.webshop.common.ControllerHelper;
import com.moris.webshop.common.Country;
import com.moris.webshop.common.Customer;
import com.moris.webshop.frontend.country.CountryService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "*")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private CountryService countryService;

	@Autowired
	private ControllerHelper controllerHelper;

	@PostMapping
	public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
		
		
		Customer cust = customerService.registerCustomer(customer);
		
		//Commented out as to not spam emails during the testing
		// sendVerificationEmail(request, customer);
		
		return ResponseEntity.ok("Ok");
	}

	@PostMapping("/edit")
	public ResponseEntity<?> editCustomer(@RequestBody Customer newCust, HttpServletRequest req) {
		Customer cust = controllerHelper.getAuthenticatedCustomer(req);
		if (cust == null) {
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NOT_FOUND);
		}

		Customer original = customerRepo.findByEmail(newCust.getEmail());
		newCust.setId(original.getId());

	
		Country tempCountry = countryService.getByName(newCust.getCountry().getName());

		if (tempCountry == null) {

			Country newCountry = new Country(newCust.getCountry().getName());

			countryService.save(newCountry);
			newCust.setCountry(newCountry);
		}

		original = newCust;
		customerRepo.save(original);

		return ResponseEntity.ok("Updated");
	}
}
