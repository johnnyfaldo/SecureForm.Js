/*
 * captcha.js
 * Captcha Module 
 */

secureForm.captcha = (function( elements , errors ) {
	
	//store the security code
	var captcha;
	
	//generate the code
	var generateCode = function() {
		captcha = Math.floor((Math.random()*5000)+1000);
	}();
	
	//on set up insert captcha code 
	$(function() {
		$(elements.insertCaptcha).html(captcha);
	});

	
	return function() {
		
		//compare security code to use entered value
		if(parseInt($(elements.captcha).val()) === captcha) {
			//it's correct 
			//remove error class
			$(elements.captcha).removeClass('sf-captcha-error');
			return true;
		}else {
			//incorrect - log and display error
			errors.clear();
			errors.add('Security code was incorrect');
			errors.display('Error: ');
			//add error class
			$(elements.captcha).addClass('sf-captcha-error');
			return false;
		}
		
	};
	
})( secureForm.elements , secureForm.errors );
