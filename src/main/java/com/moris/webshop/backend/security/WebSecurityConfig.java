//package com.moris.webshop.backend.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.moris.webshop.backend.security.jwt.AuthEntryPointJwt;
//import com.moris.webshop.backend.security.jwt.AuthTokenFilter;
//import com.moris.webshop.backend.security.services.UserDetailsServiceImpl;
//
//@Configuration
//@Order(1)
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(
//		// securedEnabled = true,
//		// jsr250Enabled = true,
//		prePostEnabled = true)
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//	@Autowired
//	UserDetailsServiceImpl userDetailsService;
//	@Autowired
//	private AuthEntryPointJwt unauthorizedHandler;
//
//	@Bean
//	public AuthTokenFilter authenticationJwtTokenFilter() {
//		return new AuthTokenFilter();
//	}
//
//	@Override
//	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
//		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//	}
//
//	@Bean
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
//				.antMatchers("/api/auth/**").permitAll()
//				.antMatchers("/api/test/**").permitAll()
//				.antMatchers("/api/items/**").permitAll()
//				.antMatchers("/api/categories/**").permitAll()
//				.antMatchers("/api/item/**").permitAll()
//				.antMatchers("/api/item/**").permitAll()
//				.anyRequest()
//				.authenticated();
//		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//	}
//}
