/*
 * compare.js
 * Compare Module
 */

secureForm.compare = (function( elements , errors ) {
	
	var $comparisons = $(elements.comparison);
	
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
			//console.log(labels);
			//not all fields matched 
			//log and display error
			errors.clear();
			errors.add(labels.join(', '));
			errors.display('The following fields must match: ');
			//add error class
			$(elements.comparison).addClass('sf-comparison-error');
			return false;
		}else {
			//all match - validation passed 
			return true;
		}
		
	};
	
})( secureForm.elements , secureForm.errors );
