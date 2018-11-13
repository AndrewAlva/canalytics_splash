// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
	// Form interactions
		var registerForm = {
			visible: false,
			agree_checkbox: $('#agree-checkbox'),
			submit_btn: $('#submit-application'),
			agree_triger: $('#user-agree'),
			toggleListener: function(){
				// Listener to able/disable submit form
				this.agree_triger.on('click', function(event) {
					if (registerForm.agree_checkbox.is(':checked')) {
						registerForm.submit_btn.removeClass('off')
					} else {
						registerForm.submit_btn.addClass('off')
					}
				});
			},
			scrollListener: function(){
				$('html').bind('mousewheel DOMMouseScroll', function (e) {
					var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);

					if (delta < 0) {
						// console.log('You scrolled down');
						registerForm.show();
					} else if (delta > 0) {
						// console.log('You scrolled up');
						registerForm.hide();
					}
				});
			},
			show: function(){
				this.visible = true;
			},
			hide: function(){
				this.visible = false;
			},

			init: function(){
				// Check agreement status and able/disable submit button
				if (this.agree_checkbox.is(':checked')) {
					registerForm.submit_btn.removeClass('off');
				}

				// Activate click listener for agreement
				this.toggleListener();

				// Activate scroll listener
				this.scrollListener();
			}
		}
		registerForm.init();

		// Labels
			// Add/remove class to ".ac-input" to change behavior of its own label
				// If input is empty, custom <label> stays over input
				// If input has text in it, <label> fades
				$(".ac-input").focusout(function(){
					$(".ac-input").blur(function(){
						if( !this.value ) {
							$(this).removeClass("filled");
						} else{
							$(this).addClass("filled");
						}
					});
				});

		// Register form interactions
			// Behavior will depend on if user's device is mobile or not
			// so, this is a flag & a listener to detect it
			var isMobile = (window.innerWidth < 768) ? true : false;
			$(window).on('resize', function(event) {
				event.preventDefault();
				// Check if user is now on mobile
				isMobile = (window.innerWidth < 768) ? true : false;
			});
});


// Trigger functions after page is completely loaded
window.onload = function() {
	// Do something, remove preloader perhaps
	console.log("Page fully loaded.");
	console.log("Initialize.js");
}