/*
 * captcha.js
 * Captcha Module 
 */

define([
	'jquery',
	'underscore',
	'app/elements',
	'app/errors'
],function( $ , _ , elements , errors ) {
	
	//store the security code
	var captcha;
	
	//generate the code
	var generateCode = function() {
		captcha = Math.floor((Math.random()*5000)+1000);
	}();
	
	//on set up insert captcha code 
	$(elements.insertCaptcha).html(captcha);
	
	return function() {
		
		//compare security code to use entered value
		if(parseInt($(elements.captcha).val()) === captcha) {
			//it's correct 
			//remove error class
			$(elements.captcha).removeClass('sf-captcha-wrong');
			return true;
		}else {
			//incorrect - log and display error
			errors.clear();
			errors.add('Security code was incorrect');
			errors.display('Error: ');
			//add error class
			$(elements.captcha).addClass('sf-captcha-wrong');
			return false;
		}
		
	};
	
});
