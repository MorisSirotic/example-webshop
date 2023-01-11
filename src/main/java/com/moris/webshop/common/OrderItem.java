package com.moris.webshop.common;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.moris.webshop.common.base.IdBasedEntity;

@Entity
@Table(name = "order_items")
public class OrderItem extends IdBasedEntity {
	
	@ManyToOne
	@JoinColumn
	private Customer customer;

	@ManyToOne
	@JoinColumn
	private Product product;

	private Double total;

	private Date created;
	
	private Date updated;
	
	private Date completed;
}
