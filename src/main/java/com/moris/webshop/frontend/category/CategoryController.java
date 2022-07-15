package com.moris.webshop.frontend.category;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.backend.repository.CategoryRepository;
import com.moris.webshop.common.Category;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {
	@Autowired
	private final CategoryRepository categoryRepository;
	@Autowired
	private final CategoryService categoryService;

	public CategoryController(CategoryRepository categoryRepository, CategoryService categoryService) {
		this.categoryRepository = categoryRepository;
		this.categoryService = categoryService;
	}

	@GetMapping("/")
	public ResponseEntity<List<Category>> getAll(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

	return ResponseEntity.ok()
				.body(categoryRepository.findAll());
	
	}


	@GetMapping("/root")
	public List<Category> getOne() {
		return categoryService.getRootCategories();
	}

	@GetMapping("/{id}")
	public Category getOne(@PathVariable Integer id) {
		return categoryRepository.findById(id).orElseThrow(RuntimeException::new);
	}

}