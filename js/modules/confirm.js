/*
 * confirm.js
 * Confirmation Validation Module
 */

secureForm.confirm = (function( elements , errors ) {
				
	return function() {
		
		//vars
		var $confirm 	= $(elements.confirm),
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
			console.log('test');
			errors.display('The following must be checked: ');
			return false;
		}else {
			//no errors - passed
			return true;
		}
		
	};	
	
})(secureForm.elements, secureForm.errors);
