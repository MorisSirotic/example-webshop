package com.moris.webshop.frontend.cart;

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
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.common.CartItem;
import com.moris.webshop.common.Customer;
import com.moris.webshop.common.Product;
import com.moris.webshop.common.Utility;
import com.moris.webshop.frontend.customer.CustomerNotFoundException;
import com.moris.webshop.frontend.customer.CustomerService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class CartController {

	@Autowired
	private CartService cartService;
	@Autowired
	private CustomerService customerService;

	@PostMapping("/cart/add/{productId}/{quantity}")
	public ResponseEntity<?> addProductToCart(@PathVariable("productId") Integer productId,
			@PathVariable("quantity") Integer quantity, HttpServletRequest request) {
		
		
		try {
			Customer customer = getAuthenticatedCustomer(request);
			
			
			CartItem test = cartService.findCartItem(customer, productId);
		if (test != null) {
			cartService.updateQuantity(productId, quantity + test.getQuantity(), customer);
		}else {
			cartService.addProduct(productId, quantity, customer);
		}
	
			
		} catch (CustomerNotFoundException err) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(err);
		} catch (CartException err) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(err);
		}
		return ResponseEntity.ok("");

	}

	@GetMapping("/cart")
	public List<CartItem> getCart(HttpServletRequest request) {
	

		try {

			Customer customer = getAuthenticatedCustomer(request);
			return cartService.listCartItems(customer);

		} catch (CustomerNotFoundException ex) {
			return null;
		}

	}

	@PutMapping("/cart/update/{productId}/{quantity}")
	public String updateQuantity(@PathVariable("productId") Integer productId,
			@PathVariable("quantity") Integer quantity, HttpServletRequest request) {
		try {
			Customer customer = getAuthenticatedCustomer(request);
			float subtotal = cartService.updateQuantity(productId, quantity, customer);

			return String.valueOf(subtotal);
		} catch (CustomerNotFoundException ex) {
			return "You must login to change quantity of product.";
		}
	}

	@DeleteMapping("/cart/remove/{productId}")
	public String removeProduct(@PathVariable("productId") Integer productId, HttpServletRequest request) {
		try {
			Customer customer = getAuthenticatedCustomer(request);
			cartService.removeProduct(productId, customer);

			return "The product has been removed from your shopping cart.";

		} catch (CustomerNotFoundException e) {
			return "You must login to remove product.";
		}
	}

	private Customer getAuthenticatedCustomer(HttpServletRequest request) throws CustomerNotFoundException {
		String email = Utility.getEmailOfAuthenticatedCustomer(request);
		if (email == null) {
			throw new CustomerNotFoundException("No authenticated customer");
		}

		return customerService.getCustomerByEmail(email);
	}
}
