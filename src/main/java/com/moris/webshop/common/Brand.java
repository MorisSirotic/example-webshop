package com.moris.webshop.common;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.moris.webshop.common.base.IdBasedEntity;

@Entity
@Table(name = "brands")
public class Brand extends IdBasedEntity{
	private String name;

	@ManyToMany
	@JoinTable(name = "brand_categories", joinColumns = @JoinColumn(name = "fk_brand"), inverseJoinColumns = @JoinColumn(name = "fk_category"))
	private Set<Category> brandCategories = new HashSet<>();

	protected Brand() {
	}

	public Brand(String name) {
		this.name = name;
	}

	public Brand(String name, Set<Category> brandCategories) {
		this.name = name;
		this.brandCategories = brandCategories;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Category> getBrandCategories() {
		return brandCategories;
	}

	public void setBrandCategories(Set<Category> brandCategories) {
		this.brandCategories = brandCategories;
	}

	@Override
	public String toString() {
		return "Brand [id=" + id + ", name=" + name + ", categories=" + brandCategories + "]";
	}	
}
