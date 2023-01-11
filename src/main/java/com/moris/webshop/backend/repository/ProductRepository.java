package com.moris.webshop.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.moris.webshop.common.Product;
import com.moris.webshop.common.order.Order;

public interface ProductRepository extends PagingAndSortingRepository<Product, Integer> {
//	@Query("SELECT p FROM Product p WHERE p.name = ?2")
//	public Page<Product> findByKeyword(int pageNumber, String keyword, Pageable pagable);
//
//	@Query("SELECT p FROM Product p WHERE p.enabled = true AND p.category.id = ?1")
//	public Page<Product> listByCategory(Integer categoryId,Pageable pagable);
//	
//	@Query("SELECT p FROM Product p WHERE p.category.id = ?1")
//	public Page<Product> listByEnabled(int categoryId, Pageable pagable);
//
//	@Query("SELECT p FROM Product p WHERE p.category.id = ?1")
//	public List<Product> listByCategory(int categoryId);
//
//	
//	@Query("SELECT p FROM Product p WHERE p.id = ?1")
//	public Page<Product> findAllCustom(Integer prodId, Pageable pageable);
	
	@Query("SELECT p FROM Product p WHERE p.name LIKE %?1%")
	public List<Product> findByKeyword(String keyword);

	@Query("SELECT p FROM Product p WHERE p.enabled = true AND p.category.id = ?1")
	public List<Product> listByCategory(Integer categoryId);
	
	@Query("SELECT p FROM Product p WHERE p.category.id = ?1")
	public List<Product> listByEnabled(int categoryId);

	@Query("SELECT p FROM Product p WHERE p.category.id = ?1")
	public List<Product> listByCategory(int categoryId);


}
