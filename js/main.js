/*
 * Main file for Require.js configures and loads in modules
 */

require.config({
	baseUrl: 'js/',
	//TODO remove urlArgs for production (prevents caching)
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		'jquery'       : 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
		'app'          : 'modules',
		'underscore'   : 'lib/underscore'
	},
	shim: {
        "underscore": {
            exports: "_"
        }
    }
});

requirejs([
	'jquery',
	'app/elements',
	'app/required',
	'app/errors',
	'underscore'
	], function($, elements, required, errors, _) {
	
		$(function() {
			
			$(elements.form).submit(function() {
				
				//clear errors from previous submissions
				errors.clear();
				
				var checks = [
					required,
				]
				
				_.each(checks,function(check) {
					
					check();
					
				});
																			
				//return false
				return false;
				
			});
			
		});
	
});

