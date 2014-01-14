/*
 * sf-elements.js
 * sfElements module 
 */

secureForm.elements = {	

	form:          '#secureForm',
	required:	   '.sf-required',
	insertCaptcha: '#sf-insert-captcha',
	captcha:       '#sf-captcha',
	errorBox:      '#sf-error-box',
	comparison:    '.sf-compare',
	email:         '.sf-email',
	confirm:       '.sf-confirm',
	
	setElement: function(e,value) {
		this[e] = value;
	},
	
};
