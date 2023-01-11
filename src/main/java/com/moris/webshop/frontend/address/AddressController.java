package com.moris.webshop.frontend.address;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.common.Address;
import com.moris.webshop.common.ControllerHelper;
import com.moris.webshop.common.Country;
import com.moris.webshop.common.Customer;
import com.moris.webshop.frontend.country.CountryService;

@RestController
@RequestMapping("/address")
@CrossOrigin(value = "*")
public class AddressController {

	@Autowired
	private AddressService service;

	@Autowired
	private CountryService countryService;

	@Autowired
	private ControllerHelper controllerHelper;

	@GetMapping("/")
	public ResponseEntity<List<Address>> listOrdersByPage(HttpServletRequest request) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);

		List<Address> addresses = service.listAddressBook(customer);

		return ResponseEntity.ok(addresses);
	}

	@GetMapping("/default")
	public ResponseEntity<Address> getDefaultAddress(HttpServletRequest request) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);

		Address address = service.getDefaultAddress(customer);

		return ResponseEntity.ok(address);
	}

	@PostMapping("/default/{addressId}")
	public ResponseEntity<Address> newDefaultAddress(HttpServletRequest request, @PathVariable int addressId) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);

		
		service.setDefaultAddress(addressId, customer.getId());

		Address address = service.getDefaultAddress(customer);

		return ResponseEntity.ok(address);
	}

	@PostMapping("/new")
	public ResponseEntity<?> addNewAddress(HttpServletRequest request, @RequestBody Address address) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);
		Country country = countryService.getByName(address.getCountry().getName());
		if (country == null) {
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NOT_FOUND).body("message: gegeo");
		}
		
		address.setCustomer(customer);
		
		address.setCountry(country);

		service.save(address);

		List<Address> addresses = service.listAddressBook(customer);

		return ResponseEntity.ok(addresses);
	}

	@PutMapping("/update/{addressId}")
	public ResponseEntity<?> updateAddress(HttpServletRequest request, @PathVariable int addressId,
			@RequestBody Address newAddress) throws Exception {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);
		
		Address toUpdate = service.get(addressId, customer.getId());
		if (toUpdate == null) {
			throw new Exception("Couldn't find the address");
		}
		
		Country country = countryService.getByName(newAddress.getCountry().getName());
		
		if (country == null) {
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NOT_FOUND).body("message: gegeo");
		}
		newAddress.setCountry(country);

		newAddress.setId(addressId);
		newAddress.setCustomer(customer);

		service.save(newAddress);

		Address saved = service.get(addressId, customer.getId());


		return ResponseEntity.ok(saved);
	}

	@DeleteMapping("/delete/{addressId}")
	public ResponseEntity<?> deleteAddress(HttpServletRequest request, @PathVariable int addressId) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);

		service.delete(addressId, customer.getId());

		return ResponseEntity.ok("Deleted");
	}
}
