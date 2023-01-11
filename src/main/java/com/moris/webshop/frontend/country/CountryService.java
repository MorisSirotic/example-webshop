package com.moris.webshop.frontend.country;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moris.webshop.backend.repository.CountryRepository;
import com.moris.webshop.common.Country;

@Service
public class CountryService {
	@Autowired
	private CountryRepository repo;
	
	public void save(Country country){
		 repo.save(country);
	}
	
	public Country getByName(String name){
		return repo.findByName(name);
	}
}
