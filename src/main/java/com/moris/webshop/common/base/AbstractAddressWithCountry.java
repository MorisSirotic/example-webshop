package com.moris.webshop.common.base;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import com.moris.webshop.common.Country;

@MappedSuperclass
public class AbstractAddressWithCountry extends AbstractAddress {
	
	@ManyToOne
	@JoinColumn(name = "country_id")
	protected Country country;
	
	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	@Override
	public String toString() {
		return "AbstractAddressWithCountry [country=" + country + ", addressLine1=" + addressLine1 + ", addressLine2="
				+ addressLine2 + "]";
	}
	
	
	
//	@Override
//	public String toString() {
//		String address = firstName;
//		
//		if (lastName != null && !lastName.isEmpty()) address += " " + lastName;
//		
//		if (addressLine1 != null && !addressLine1.isEmpty()) address += ", " + addressLine1;
//		
//		if (addressLine2 != null && !addressLine2.isEmpty()) address += ", " + addressLine2;
//		
//		if (city != null && !city.isEmpty()) address += ", " + city;
//		
//		if (country != null && state != null && !state.isEmpty()) address += ", " + state;
//		
//		address += ", " + country.getName();
//		
//		if (postalCode != null && !postalCode.isEmpty()) address += ". Postal Code: " + postalCode;
//		if (phoneNumber != null && !phoneNumber.isEmpty()) address += ". Phone Number: " + phoneNumber;
//		
//		return address;
//	}	
}
