package com.moris.webshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moris.webshop.common.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	public User findByEmail(String email);

	public boolean existsByEmail(String email);

}
