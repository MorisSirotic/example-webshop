package com.moris.webshop.common.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moris.webshop.backend.repository.SettingRepository;
import com.moris.webshop.common.Currency;
import com.moris.webshop.common.setting.CurrencyRepository;
import com.moris.webshop.common.setting.CurrencySettingBag;
import com.moris.webshop.common.setting.EmailSettingBag;
import com.moris.webshop.common.setting.PaymentSettingBag;
import com.moris.webshop.common.setting.Setting;
import com.moris.webshop.common.setting.SettingCategory;


@Service
public class SettingService {
	@Autowired private SettingRepository settingRepo;
	@Autowired private CurrencyRepository currencyRepo;

	public List<Setting> getGeneralSettings() {
		return settingRepo.findByTwoCategories(SettingCategory.GENERAL, SettingCategory.CURRENCY);
	}
	
	public EmailSettingBag getEmailSettings() {
		List<Setting> settings = settingRepo.findByCategory(SettingCategory.MAIL_SERVER);
		settings.addAll(settingRepo.findByCategory(SettingCategory.MAIL_TEMPLATES));
		
		return new EmailSettingBag(settings);
	}
	
	public CurrencySettingBag getCurrencySettings() {
		List<Setting> settings = settingRepo.findByCategory(SettingCategory.CURRENCY);
		return new CurrencySettingBag(settings);
	}
	
	public PaymentSettingBag getPaymentSettings() {
		List<Setting> settings = settingRepo.findByCategory(SettingCategory.PAYMENT);
		return new PaymentSettingBag(settings);
	}
	
	public String getCurrencyCode() {
		Setting setting = settingRepo.findByKey("CURRENCY_ID");
		Integer currencyId = Integer.parseInt(setting.getValue());
		Currency currency = currencyRepo.findById(currencyId).get();
		
		return currency.getCode();
	}
}