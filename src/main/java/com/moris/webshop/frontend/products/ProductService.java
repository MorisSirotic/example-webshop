package com.moris.webshop.frontend.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.moris.webshop.backend.repository.ProductRepository;
import com.moris.webshop.common.Customer;
import com.moris.webshop.common.Product;
import com.moris.webshop.common.order.Order;

@Service
public class ProductService {

	public static final int PRODUCTS_PER_PAGE = 10;
	
	@Autowired
	private ProductRepository repo;
	

	public List<Product> getAll() {
		return (List<Product>) repo.findAll();
	}
	
	public List<Product> listByCategory(Integer categoryId) {
	
		return repo.listByCategory(categoryId);
	}
	
	public List<Product> listByKeyword(int pageNum, String keyword) {
		
		List<Product> listProducts  = repo.findByKeyword(keyword);

		return listProducts;
	}
	public Product getById(Integer id) {
		return repo.findById(id).orElseThrow();
	}

	public List<Product> getallProducts() {
		return (List<Product>) repo.findAll();
	
	}

}



//public List<Product> getAll() {
//	return (List<Product>) repo.findAll();
//}
//
//public Page<Product> listByCategory(int pageNum, Integer categoryId) {
//	Pageable pagebale = PageRequest.of(pageNum, PRODUCTS_PER_PAGE);
//	return repo.listByCategory(categoryId, pagebale);
//}
//
//public List<Product> listByKeyword(int pageNum, String keyword) {
//	Pageable pagebale = PageRequest.of(pageNum, PRODUCTS_PER_PAGE);
//	
//	Page<Product> page = repo.findByKeyword(1,keyword,pagebale);
//	List<Product> listProducts = page.getContent();
//	return listProducts;
//}
//public Product getById(Integer id) {
//	return repo.findById(id).orElseThrow();
//}
//
//public List<Product> getByCategory(int categoryId) {
//	return repo.listByCategory(categoryId);
//}
//
//public Page<Product> getallProducts(int id) {
//	Pageable pagebale = PageRequest.of(1, PRODUCTS_PER_PAGE);
//	return repo.findAllCustom(1, pagebale);
//}
