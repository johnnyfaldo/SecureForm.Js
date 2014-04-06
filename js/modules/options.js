/*
 * app settings
 */

secureForm.options = (function( elements ) {
	
	var options = {				
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
					}
				}
			}
		}

	};
	
})( secureForm.elements );
