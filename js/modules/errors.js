/*
 * errors.js
 * Errors module
 */

secureForm.errors = (function( elements ) {

	//check elements have been passed
	if(elements === false) {
		console.log('Module: Errors','Error: elements object was not passed through');
	}
	
	var errors = [];
	
	var buildList = function() {
		var displayErrors = '';
		_.each(errors, function(error) {
			displayErrors += error + ', ';
		});
		return displayErrors.slice(0,-2);
	};
	
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
			var suffix = '<span class="sf-suffix">'+suffix+'</span>', 
				prefix = '<br /><br />';
			$(elements.errorBox).append(suffix+buildList(errors)+prefix);
		},
		
		reset:function() {
			this.clear();
			$(elements.errorBox).html('');
		},
				
	};
	
})(secureForm.elements || false);
