
package com.moris.webshop.frontend.checkout;

import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moris.webshop.common.Address;
import com.moris.webshop.common.CartItem;
import com.moris.webshop.common.ControllerHelper;
import com.moris.webshop.common.Country;
import com.moris.webshop.common.Customer;
import com.moris.webshop.common.Utility;
import com.moris.webshop.common.order.Order;
import com.moris.webshop.common.order.PaymentMethod;
import com.moris.webshop.common.service.SettingService;
import com.moris.webshop.common.setting.CurrencySettingBag;
import com.moris.webshop.common.setting.EmailSettingBag;
import com.moris.webshop.common.setting.PaymentSettingBag;
import com.moris.webshop.frontend.address.AddressService;
import com.moris.webshop.frontend.cart.CartService;
import com.moris.webshop.frontend.checkout.paypal.PayPalApiException;
import com.moris.webshop.frontend.checkout.paypal.PayPalService;
import com.moris.webshop.frontend.country.CountryService;
import com.moris.webshop.frontend.order.OrderService;
import com.moris.webshop.frontend.shipping.ShippingRate;
import com.moris.webshop.frontend.shipping.ShippingRateService;

@RestController
@CrossOrigin(origins = "*")
public class CheckoutController {

	@Autowired
	private CheckoutService checkoutService;
	@Autowired
	private ControllerHelper controllerHelper;
	@Autowired
	private AddressService addressService;
	@Autowired
	private ShippingRateService shipService;
	@Autowired
	private CartService cartService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private SettingService settingService;
	@Autowired
	private CountryService countryService;
	@Autowired
	private PayPalService paypalService;

	@GetMapping("/checkout")
	public ResponseEntity<CheckoutInfo> getCheckoutInfo(HttpServletRequest request) {
		Customer customer = controllerHelper.getAuthenticatedCustomer(request);

		Address defaultAddress = addressService.getDefaultAddress(customer);

		ShippingRate shippingRate = null;

		if (defaultAddress != null) {

			shippingRate = shipService.getShippingRateForAddress(defaultAddress);

		} else {

			shippingRate = shipService.getShippingRateForCustomer(customer);

		}

		if (shippingRate == null) {

			shippingRate = shipService.getStandard();

		}

		List<CartItem> cartItems = cartService.listCartItems(customer);
		CheckoutInfo checkoutInfo = checkoutService.prepareCheckout(cartItems, shippingRate);

//		String currencyCode = settingService.getCurrencyCode();
//		PaymentSettingBag paymentSettings = settingService.getPaymentSettings();
		// String paypalClientId = paymentSettings.getClientID();

		return ResponseEntity.ok(checkoutInfo);
	}

	@PostMapping("/place_order")
	public ResponseEntity<?> placeOrder(HttpServletRequest request)
			throws UnsupportedEncodingException, MessagingException {
		String paymentType = "COD";
		// request.getParameter("paymentMethod");

		PaymentMethod paymentMethod = PaymentMethod.valueOf(paymentType);

		Customer customer = controllerHelper.getAuthenticatedCustomer(request);

		Address defaultAddress = addressService.getDefaultAddress(customer);
		ShippingRate shippingRate = null;
		if (defaultAddress != null) {
			shippingRate = shipService.getShippingRateForAddress(defaultAddress);
		} else {

			shippingRate = shipService.getShippingRateForCustomer(customer);
		}

		if (shippingRate == null) {
			shippingRate = shipService.getStandard();
		}

		List<CartItem> cartItems = cartService.listCartItems(customer);
		CheckoutInfo checkoutInfo = checkoutService.prepareCheckout(cartItems, shippingRate);

		Order createdOrder = orderService.createOrder(customer, defaultAddress, cartItems, paymentMethod, checkoutInfo);
		cartService.deleteByCustomer(customer);
		sendOrderConfirmationEmail(request, createdOrder);

		return ResponseEntity.ok(createdOrder);
	}

	private void sendOrderConfirmationEmail(HttpServletRequest request, Order order)
			throws UnsupportedEncodingException, MessagingException {
		EmailSettingBag emailSettings = settingService.getEmailSettings();
		JavaMailSenderImpl mailSender = Utility.prepareMailSender(emailSettings);
		mailSender.setDefaultEncoding("utf-8");

		String toAddress = order.getCustomer().getEmail();

		String subject = emailSettings.getOrderConfirmationSubject();
		String content = emailSettings.getOrderConfirmationContent();

		subject = subject.replace("[[orderId]]", String.valueOf(order.getId()));

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setFrom(emailSettings.getFromAddress(), emailSettings.getSenderName());
		helper.setTo(toAddress);
		helper.setSubject(subject);

		DateFormat dateFormatter = new SimpleDateFormat("HH:mm:ss E, dd MMM yyyy");
		String orderTime = dateFormatter.format(order.getOrderTime());

		CurrencySettingBag currencySettings = settingService.getCurrencySettings();

		String totalAmount = Utility.formatCurrency(order.getTotal(), currencySettings);

		content = content.replace("[[name]]", order.getCustomer().getFullName());
		content = content.replace("[[orderId]]", String.valueOf(order.getId()));
		content = content.replace("[[orderTime]]", orderTime);
		content = content.replace("[[shippingAddress]]", order.getShippingAddress());
		content = content.replace("[[total]]", totalAmount);
		content = content.replace("[[paymentMethod]]", order.getPaymentMethod().toString());

		helper.setText(content, true);
		mailSender.send(message);
	}

//	@PostMapping("/process_paypal_order")
//	public ResponseEntity<String> processPayPalOrder(HttpServletRequest request)
//			throws UnsupportedEncodingException, MessagingException {
//		String orderId = request.getParameter("orderId");
// 
//		String pageTitle = "Checkout Failure";
//		String message = null;
//
//		try {
//			if (paypalService.validateOrder(orderId)) {
//				return placeOrder(request);
//			} else {
//				pageTitle = "Checkout Failure";
//				message = "ERROR: Transaction could not be completed because order information is invalid";
//			}
//		} catch (PayPalApiException e) {
//			message = "ERROR: Transaction failed due to error: " + e.getMessage();
//		}
//
//		return ResponseEntity.ok("message paypal thingy");
//	}
}