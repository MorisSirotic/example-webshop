package com.moris.webshop.common;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.moris.webshop.common.setting.CurrencySettingBag;
import com.moris.webshop.common.setting.EmailSettingBag;

public class Utility {
//	public static String getSiteURL(HttpServletRequest request) {
//		String siteURL = request.getRequestURL().toString();
//
//		return siteURL.replace(request.getServletPath(), "");
//	}
	
	public static String getSiteURL(HttpServletRequest request) {

	return ("http://aquaticstore.ddns.net");
}
	
	public static JavaMailSenderImpl prepareMailSender(EmailSettingBag settings) {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

		mailSender.setHost(settings.getHost());
		mailSender.setPort(settings.getPort());
		mailSender.setUsername(settings.getUsername());
		mailSender.setPassword(settings.getPassword());

		Properties mailProperties = new Properties();
		mailProperties.setProperty("smtp.gmail.com", settings.getSmtpAuth());
		mailProperties.setProperty("mail.smtp.starttls.enable", settings.getSmtpSecured());

		mailSender.setJavaMailProperties(mailProperties);

		return mailSender;
	}

	public static String getEmailOfAuthenticatedCustomer(HttpServletRequest request) {
		Object principal = request.getUserPrincipal();
		
	
		if (principal == null)
			return null;

		String customerEmail = null;

		if (principal instanceof UsernamePasswordAuthenticationToken
				|| principal instanceof RememberMeAuthenticationToken) {
			customerEmail = request.getUserPrincipal().getName();
		}
		
		return customerEmail;
	}

	public static String formatCurrency(float amount, CurrencySettingBag settings) {
		String symbol = settings.getSymbol();
		String symbolPosition = settings.getSymbolPosition();
		String decimalPointType = settings.getDecimalPointType();
		String thousandPointType = settings.getThousandPointType();
	//int decimalDigits = settings.getDecimalDigits();
		
//
		String pattern = symbolPosition.equals("Before price") ? symbol : "";
		pattern += "###,###";

//		if (decimalDigits > 0) {
//			pattern += ".";
//			for (int count = 1; count <= decimalDigits; count++)
//				pattern += "#";
//		}

		pattern += symbolPosition.equals("After price") ? symbol : "";

		char thousandSeparator = thousandPointType.equals("POINT") ? '.' : ',';
		char decimalSeparator = decimalPointType.equals("POINT") ? '.' : ',';

		DecimalFormatSymbols decimalFormatSymbols = DecimalFormatSymbols.getInstance();
		decimalFormatSymbols.setDecimalSeparator(decimalSeparator);
		decimalFormatSymbols.setGroupingSeparator(thousandSeparator);

		DecimalFormat formatter = new DecimalFormat(pattern, decimalFormatSymbols);

		return formatter.format(amount);
	}
}