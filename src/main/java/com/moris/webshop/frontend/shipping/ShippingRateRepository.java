package com.moris.webshop.frontend.shipping;

import org.springframework.data.repository.CrudRepository;

import com.moris.webshop.common.Country;

public interface ShippingRateRepository extends CrudRepository<ShippingRate, Integer> {

	public ShippingRate findByCountryAndState(Country country, String state);
	
	public ShippingRate findByCountry(Country country);
}
