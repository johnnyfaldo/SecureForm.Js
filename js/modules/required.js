/*
 * sf-require.js 
 * sfRequired Module of secureForm 
 */

define([
	'jquery',
	'app/elements',
	'app/errors'
	], function( $ , elements , errors ) {
					
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
					errorsFound ++;
					//use label if defined
					if(label) {
						errors.add(label);
					}else {
						//else use the name 
						errors.add($this.prop('name'));
					}
				}	
				
			});
			
			//check for any errors
			if(errorsFound > 0) {
				
				//there are errors - add 
				$(elements.required).addClass('sf-blank');
				
				//show user the errors
				errors.display('The following are required fields: ');
				
				//failed
				return false;
				
			}else {
				//passed
				return true;
			}
			
	
		};
	
});