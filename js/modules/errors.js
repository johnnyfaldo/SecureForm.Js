/*
 * errors.js
 * Errors module
 */

secureForm.errors = (function( elements ) {

	//check elements have been passed
	if(elements === false) {
		console.log('Module: Errors','Error: elements object was not passed through');
	}
	
	var errors   = [],
		boxInDom = false;
	
	var buildList = function() {
		var displayErrors = '';
		_.each(errors, function(error) {
			displayErrors += error + ', ';
		});
		return displayErrors.slice(0,-2);
	};
	
	//check if error box is in dom
	$(function() {
		if($(elements.errorBox).length) {
			boxInDom = true;
		}
	});
		
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
			if(boxInDom) {
				var suffix = '<span class="sf-suffix">'+suffix+'</span>', 
				prefix = '<br /><br />';
				$(elements.errorBox).append(suffix+buildList(errors)+prefix);
			}
		},
		
		reset:function() {
			this.clear();
			$(elements.errorBox).html('');
		},
		
		//if error box exists - scroll to it to put errors in view
		scrollToErrors:function() {		
			if(boxInDom) {
				$(elements.errorBox).fadeIn("slow");
				var offset = ($(elements.errorBox).offset().top) - 40;
				$('html').animate({
					scrollTop:offset
				},500);
			}
		}
				
	};
	
})(secureForm.elements || false);
