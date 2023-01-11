package com.moris.webshop.frontend.shipping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moris.webshop.backend.repository.CountryRepository;
import com.moris.webshop.common.Address;
import com.moris.webshop.common.Country;
import com.moris.webshop.common.Customer;

@Service
public class ShippingRateService {

	@Autowired
	private ShippingRateRepository repo;
	
	@Autowired
	private CountryRepository countryRepo;

	public ShippingRate getShippingRateForCustomer(Customer customer) {
		String state = customer.getState();
		if (state == null || state.isEmpty()) {
			state = customer.getCity();
		}

		return repo.findByCountryAndState(customer.getCountry(), state);
	}

	public ShippingRate getShippingRateForAddress(Address address) {
		
		
		String state = address.getState();
		
		if (state == null || state.isEmpty()) {
			state = address.getCity();
		}

		return repo.findByCountryAndState(address.getCountry(), state);
	}
	
	public ShippingRate getShippingRateForCustomerByCountry(Customer customer) {
		String state = customer.getState();
		if (state == null || state.isEmpty()) {
			state = customer.getCity();
		}

		return repo.findByCountry(customer.getCountry());
	}
	
	public ShippingRate getStandard() {
		String state = "unknown";
		Country country = countryRepo.findByName("unknown");
		
		
		return repo.findByCountryAndState(country, state);
	}
}
