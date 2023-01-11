package com.moris.webshop.frontend.category;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moris.webshop.backend.repository.CategoryRepository;
import com.moris.webshop.common.Category;

@Service
@Transactional
public class CategoryService {

	@Autowired
	private CategoryRepository repo;

	public List<Category> getRootCategories() {

		List<Category> allCat = repo.findAll();

		List<Category> rootCat = new ArrayList<>();

		allCat.forEach(cat -> {
			
			if (cat.getParent() == null) {
				rootCat.add(cat);
			}
		});

		return rootCat;

	}

}
