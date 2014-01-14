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
