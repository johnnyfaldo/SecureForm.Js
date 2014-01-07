/*
 * Main file for Require.js configures and loads in modules
 */

require.config({
	baseUrl: 'js/',
	//TODO remove urlArgs for production (prevents caching)
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		'jquery'       : 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
		'app'          : 'modules',
		'underscore'   : 'lib/underscore'
	},
	shim: {
        "underscore": {
            exports: "_"
        }
    }
});

requirejs([
	'jquery',
	'underscore',
	'app/elements',
	'app/errors',
	'app/required',
	'app/captcha',
	'app/compare',
	'app/email',
	'app/confirm'
	], function( $ , _ , elements , errors , required , captcha , compare , email , confirm ) {
	
		$(function() {
			
			//on form submit
			$(elements.form).submit(function() {
				
				//clear errors from previous submissions
				errors.reset();
				
				//array of checks to run
				var validations = [
					required,
					captcha,
					compare,
					email,
					confirm
				],  validationErrors = 0;
					
				//loop through validations
				_.each(validations,function(validate) {
					
					//validation returns true for no errors and false for erros
					if(!validate()) {
						//if returned false increment validation errors
						validationErrors++; 
					}
					
				});					
											
				//if no errors submit form
				if(validationErrors < 1) {
					return true;
				}else {
					//else don't submit form
					return false;
				}
				
			});
			
		});
	
});

