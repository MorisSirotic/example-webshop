package com.moris.webshop.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moris.webshop.common.Customer;
import com.moris.webshop.common.OrderItem;

public interface OrderItemRepository  extends JpaRepository<OrderItem, Integer> {

	public List<OrderItem> findByCustomer(Customer customer);
}
