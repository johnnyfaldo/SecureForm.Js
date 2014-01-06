/*
 * sf-elements.js
 * sfElements module 
 */

define({	

	form:          '#secureForm',
	required:	   '.sf-required',
	insertCaptcha: '#sf-insert-captcha',
	captcha:       '#sf-captcha',
	errorBox:      '#sf-error-box',
	comparisons:   '.sf-compare',
	
	setElement: function(e,value) {
		this[e] = value;
	},
	
});
