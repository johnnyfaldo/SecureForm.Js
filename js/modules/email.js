/*
 * email.js
 * Email Validation Module
 */

secureForm.email = (function( elements , errors ) {
	
	var $email = $(elements.email);

	var validateEmail = function(email) {
		    
		    //email validation regex
		    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    
		    //test and return 
		    console.log(re.test(email));
		    return re.test(email);
		    
	};
	
	return function() {
				
		var errorsFound = 0,
			labels = [];
		
		$email.each(function() {
			
			if(!validateEmail($(this).val())) {
				//email is invalid
				//increment errors
				errorsFound ++;
				//add error class
				$(this).addClass('sf-email-error');
			}
			
		});
		
		//check for errors 
		if(errorsFound > 0) {
			//atleast one error
			errors.clear();
			errors.display('Error: You have entered an invalid email address.');
		}
		
		
	};
	
})( secureForm.elements , secureForm.errors );
