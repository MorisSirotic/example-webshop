package com.moris.webshop.common;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moris.webshop.common.base.IdBasedEntity;

@Entity
@Table(name = "cart_items")
public class CartItem extends IdBasedEntity {
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn
	private Customer customer;

	@ManyToOne
	@JoinColumn
	private Product product;

	private Integer quantity;

	@Transient
	private float shippingCost;

	public CartItem() {
	}

	public CartItem(Customer customer, Product product, Integer quantity) {
		this.customer = customer;
		this.product = product;
		this.quantity = quantity;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public float getShippingCost() {
		return shippingCost;
	}

	public void setShippingCost(float shippingCost) {
		this.shippingCost = shippingCost;
	}

	@Override
	public String toString() {
		return "CartItem [customer=" + customer + ", product=" + product + ", quantity=" + quantity + ", shippingCost="
				+ shippingCost + ", id=" + id + "]";
	}
	
	@Transient
	public float getSubtotal() {
		return product.getDiscountPrice() * quantity;
	}
}
