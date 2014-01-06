/*
 * errors.js
 * Errors module
 */

define([
	'jquery',
	'app/elements',
	'underscore'
	],function( $ , elements, _ ) {
	
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
	
});
