//package com.moris.webshop.backend.security.jwt;
//
//import java.util.Date;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import com.moris.webshop.backend.security.services.UserDetailsImpl;
//import com.moris.webshop.frontend.security.CustomerUserDetails;
//import com.moris.webshop.frontend.security.CustomerUserDetailsService;
//
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.MalformedJwtException;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.UnsupportedJwtException;
//
//@Component
//public class JwtUtils {
//	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
//	@Value("${webshop.app.jwtSecret")
//	private String jwtSecret;
//	@Value("${webshop.app.jwtExpirationMs}")
//	private int jwtExpirationMs;
//
//	public String generateJwtToken(Authentication authentication) {
//		UserDetails userPrincipal = (CustomerUserDetails) authentication.getPrincipal();
//		return Jwts.builder().setSubject((userPrincipal.getUsername())).setIssuedAt(new Date())
//				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
//	}
//
//	public String getUserNameFromJwtToken(String token) {
//		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
//	}
//
//	public boolean validateJwtToken(String authToken) {
//		try {
//			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
//			return true;
//		} catch (MalformedJwtException e) {
//			logger.error("Invalid JWT token: {}", e.getMessage());
//		} catch (ExpiredJwtException e) {
//			logger.error("JWT token is expired: {}", e.getMessage());
//		} catch (UnsupportedJwtException e) {
//			logger.error("JWT token is unsupported: {}", e.getMessage());
//		} catch (IllegalArgumentException e) {
//			logger.error("JWT claims string is empty: {}", e.getMessage());
//		}
//		return false;
//	}
//}