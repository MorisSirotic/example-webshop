package com.moris.webshop.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moris.webshop.common.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

	public Optional<Role> findByName(String name);
	
}
