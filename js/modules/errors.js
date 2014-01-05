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
		
		list:errors,
		
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
			suffix = '<span class="sf-suffix">'+suffix+'</span>';
			$(elements.errorBox).html(suffix+buildList(errors));
		},
				
	};
	
});
