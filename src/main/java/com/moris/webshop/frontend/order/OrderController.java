package com.moris.webshop.frontend.order;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.common.ControllerHelper;
import com.moris.webshop.common.Customer;
import com.moris.webshop.common.order.Order;

@RestController
@RequestMapping("/orders")
@CrossOrigin(value = "*")
public class OrderController {

	@Autowired
	private OrderService orderService;
	@Autowired
	private ControllerHelper controllerHelper;
	// @Autowired private ReviewService reviewService;

	@GetMapping("/")
	public ResponseEntity<?> listFirstPage(HttpServletRequest request) {
		return ResponseEntity.ok("...");
//	return listOrdersByPage(request, 1, "orderTime", "desc", null);
	}

	@GetMapping("/page/{pageNum}")
	public ResponseEntity<List<Order>> listOrdersByPage(HttpServletRequest request,
		@PathVariable(name = "pageNum") int pageNum, String sortField, String sortDir, String keyword) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);

		Page<Order> page = orderService.listForCustomerByPage(customer, pageNum, sortField, sortDir, keyword);
		List<Order> listOrders = page.getContent();

		return ResponseEntity.ok(listOrders);
	}

	@GetMapping("/detail/{id}")
	public ResponseEntity<Order> viewOrderDetails(@PathVariable(name = "id") Integer id, HttpServletRequest request) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);
		Order order = orderService.getOrder(id, customer);

		return ResponseEntity.ok(order);
	}

}