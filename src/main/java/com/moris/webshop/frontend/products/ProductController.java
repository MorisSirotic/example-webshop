package com.moris.webshop.frontend.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.common.Product;
import com.moris.webshop.frontend.category.CategoryService;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
	private ProductService itemService;
	@Autowired
	private CategoryService categoryService;

	@GetMapping("/")
	public ResponseEntity<?> getAll() {
		
		List<Product> products = itemService.getAll();
		return ResponseEntity.ok(products);

	}
	
	@GetMapping("/search/")
	public List<Product> getByKeywordEmpty(@PathVariable("keyword") String keyword) {
		
		

		return itemService.getAll();
	
	}

	@GetMapping("/search/{keyword}")
	public List<Product> getByKeyword(@PathVariable("keyword") String keyword) {
		
		

		return itemService.listByKeyword(1, keyword);
	
	}

	@GetMapping("/{productId}")
	public Product getOne(@PathVariable("productId") Integer productId) {
		return itemService.getById(productId);

	}

	@GetMapping("/category/{categoryId}")
	public List<Product> getByCategory(@PathVariable("categoryId") Integer categoryId) {

		return itemService.listByCategory(categoryId);

	}

}
