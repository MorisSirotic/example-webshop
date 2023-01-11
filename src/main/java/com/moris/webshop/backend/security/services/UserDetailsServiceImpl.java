//package com.moris.webshop.backend.security.services;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.moris.webshop.backend.repository.UserRepository;
//import com.moris.webshop.common.User;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//	@Autowired
//	UserRepository userRepository;
//
//	@Override
//	@Transactional
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		User user = userRepository.findByEmail(email);
//
//		if (user != null) {
//			return UserDetailsImpl.build(user);
//		} else
//			throw new UsernameNotFoundException("User Not Found with email: " + email);
//
//	}
//}