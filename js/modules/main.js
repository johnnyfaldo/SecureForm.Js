/*
 * Pull modules together and run validations
 */

(function( options , elements , errors , required , captcha , compare , email , confirm ) {
	
		//
		$(function() {
			
			$(elements.form).submit(function() {
				
				//clear errors from previous submissions
				errors.reset();
				
				//array of checks to run
				var validations = [
					required,
					captcha,
					email,
				    confirm,
				    compare
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
					errors.scrollToErrors();
					return false;
				}
				
			});
			
		});
	
})( secureForm.options , secureForm.elements , secureForm.errors , secureForm.required , secureForm.captcha ,
	secureForm.compare , secureForm.email , secureForm.confirm);

