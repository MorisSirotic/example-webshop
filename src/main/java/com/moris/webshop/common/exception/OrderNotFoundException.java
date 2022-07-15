package com.moris.webshop.common.exception;

public class OrderNotFoundException extends Exception {

	private static final long serialVersionUID = -6150065627161266055L;

	public OrderNotFoundException(String message) {
		super(message);
	}

}
