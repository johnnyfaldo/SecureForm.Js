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
