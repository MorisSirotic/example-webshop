package com.moris.webshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class WebshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebshopApplication.class, args);
	}

}