package com.moris.webshop.frontend.customer;

public class CustomerNotFoundException extends Exception {

	private static final long serialVersionUID = 4432176932413092878L;

	public CustomerNotFoundException(String message) {
		super(message);
	}
}
