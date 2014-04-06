/*
 * Initiate Module
 * Must be first
 */

var secureForm = {};
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
/*
 * app settings
 */

secureForm.options = (function( elements ) {
	
	var options = {
		
		"testing":"124"
				
	};
		
	return function(params) {
		
		for(key in params) {
			if( options.hasOwnProperty( key ) && key !== 'elements' ) {
			   options[key] = params[key];
			}else if(key === 'elements' && typeof params[key] === 'object') {
				//it's elements obejct to set custom element classes/ids
				for( element in params[key] ) {
					if( elements.hasOwnProperty( element ) ) {
						elements[element] = params[key][element];
					}else {
						console.log(key,params[key]);
					}
				}
			}
		}
			
		console.log(options);
		console.log(elements);
						

	};
	
})( secureForm.elements );
/*
 * errors.js
 * Errors module
 */

secureForm.errors = (function( elements ) {

	//check elements have been passed
	if(elements === false) {
		console.log('Module: Errors','Error: elements object was not passed through');
	}
	
	var errors   = [],
		boxInDom = false;
	
	var buildList = function() {
		var displayErrors = '';
		_.each(errors, function(error) {
			displayErrors += error + ', ';
		});
		return displayErrors.slice(0,-2);
	};
	
	//check if error box is in dom
	$(function() {
		if($(elements.errorBox).length) {
			boxInDom = true;
		}
	});
		
	return {
				
		add:function(error)  {
			errors.push(error);
		},
		
		get:function() {
			return errors;
		},
		
		clear:function() {
			errors = [];
		},
		
		display:function(suffix) {
			if(boxInDom) {
				var suffix = '<span class="sf-suffix">'+suffix+'</span>', 
				prefix = '<br /><br />';
				$(elements.errorBox).append(suffix+buildList(errors)+prefix);
			}
		},
		
		reset:function() {
			this.clear();
			$(elements.errorBox).html('');
		},
		
		//if error box exists - scroll to it to put errors in view
		scrollToErrors:function() {		
			if(boxInDom) {
				$(elements.errorBox).fadeIn("slow");
				var offset = ($(elements.errorBox).offset().top) - 40;
				$('html').animate({
					scrollTop:offset
				},500);
			}
		}
				
	};
	
})(secureForm.elements || false);
/*
 * sf-require.js 
 * sfRequired Module of secureForm 
 */

secureForm.required = (function( elements , errors ) {
	
		return function() {		
		
			var $e = $(elements.required),
				errorsFound = 0;
			
			//loop through required fields
			$e.each(function() {
				
				var $this = $(this);
				//get a label to use in error list if user has provided one
			    var label = $this.data('label');
				
				//if field is blank add it to errors 		
				if($this.val().length < 1) {
					//increment errors
					errorsFound ++;
					//add error class
					$this.addClass('sf-required-error');
					//use label if defined
					if(label) {
						errors.add(label);
					}else {
						//else use the name 
						errors.add($this.prop('name'));
					}
				}else {
					//remove error class
					$this.removeClass('sf-required-error');
				}
				
			});
			
			//check for any errors
			if(errorsFound > 0) {
				
				//show user the errors
				errors.display('The following are required fields: ');
				
				//failed
				return false;
				
			}else {
				//passed
				return true;
			}
			
	
		};
	
})( secureForm.elements , secureForm.errors );
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
/*
 * compare.js
 * Compare Module
 */

secureForm.compare = (function( elements , errors ) {
	
	var $comparisons;
	$(function() {
		$comparisons = $(elements.comparison);
	});
	
	return function() {
		
		//vars
		var comparisons  = [],
			labels 		 = [],
			values 		 = [];
		
		//build array of comparison values
		$comparisons.each(function() {
			//add values
			comparisons.push($(this).val());
			//add labels or names 
			labels.push($(this).data('label') || $(this).prop('name'));
		});
		
		//remove duplicates, if 1 value remains then all values are the same
		var unique = _.uniq(comparisons,true);
		
		//if there's more than 1 value then all comparison fields didn't match		
		if(unique.length > 1 && (comparisons[0] !== '' || comparisons[0] !== undefined)) {
			//not all fields matched 
			errors.clear();
			errors.add(labels.join(', '));
			errors.display('The following fields must match: ');
			//add error class
			$(elements.comparison).addClass('sf-comparison-error');
			return false;
		}else {
			//all match - validation passed 
			$(elements.comparison).removeClass('sf-comparison-error');
			return true;
		}
		
	};
	
})( secureForm.elements , secureForm.errors );
/*
 * confirm.js
 * Confirmation Validation Module
 */

secureForm.confirm = (function( elements , errors ) {
			
	return function() {
		
		errors.clear();
						
		//vars
		var $confirm = $(elements.confirm),
			errorsFound = 0;
		
		//loop through confirms
		$confirm.each(function() {
			//check if checkbox is ticked
			if(!$(this).is(":checked")) {
				//it's not log error
				errorsFound++;
				errors.add($(this).data('label') || $(this).prop('name'));
				//add error class
				$(this).addClass('sf-confirm-error');
			}else {
				//it is confirmed 
				//remove error class
				$(this).removeClass('sf-confirm-error');
			}
		});
		
		//check for errors 
		if(errorsFound > 0) {
			//errors found display and return false
			errors.display('The following must be checked: ');
			return false;
		}else {
			//no errors - passed
			return true;
		}
				
	};	
	
})(secureForm.elements, secureForm.errors);
/*
 * email.js
 * Email Validation Module
 */

secureForm.email = (function( elements , errors ) {
	
	var $email;
	//wait for dom to assign $email
	$(function() {
		$email = $(elements.email);
	});

	var validateEmail = function(email) {
		    		    
		    //email validation regex
		    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    
		    //test and return 
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
			}else {
				$(this).removeClass('sf-email-error');
			}
			
		});
		
		//check for errors 
		if(errorsFound > 0) {
			//atleast one error
			errors.clear();
			errors.add('You have entered an invalid email address.');
			errors.display('Error: ');
		}else {
			return true;
		}
		
		
	};
	
})( secureForm.elements , secureForm.errors );
/*
 * Main file for Require.js configures and loads in modules
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

