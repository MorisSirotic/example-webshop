package com.moris.webshop.frontend.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.moris.webshop.common.Customer;
import com.moris.webshop.common.order.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT DISTINCT o FROM Order o JOIN o.orderDetails od JOIN od.product p " + "WHERE o.customer.id = ?2 "
			+ "AND (p.name LIKE %?1% OR o.status LIKE %?1%)")
	public Page<Order> findAllByKeyword(String keyword, Integer customerId, Pageable pageable);

	@Query("SELECT o FROM Order o WHERE o.customer.id = ?1")
	public Page<Order> findAll(Integer customerId, Pageable pageable);

	public Order findByIdAndCustomer(Integer id, Customer customer);
}