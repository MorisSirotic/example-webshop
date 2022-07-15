package com.moris.webshop.common;

import java.net.http.HttpClient.Redirect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.common.service.SettingService;
import com.moris.webshop.frontend.customer.CustomerService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class GeneralController {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private SettingService settingService;
	
	
	@GetMapping("verify")
	public ResponseEntity<String> verifyAccount(String code) {
		boolean verified = customerService.fakeVerify(code);

		return ResponseEntity.ok(verified ? "Verified Successfully. You may leave this page." : "Token Expired");
//		return ResponseEntity.ok(verified ? "Verified Successfully":"Verification failed/already verified");
	}
}
