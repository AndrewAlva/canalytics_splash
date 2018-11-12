// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Form interactions
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
		// Agreement checkbox
			// Check agreement status and able/disable submit button
			// console.log('Submit form ')
			if ($('#agree-checkbox').is(':checked')) {
				$('#submit-application').removeClass('off');
			}

			// Listener to able/disable submit form
			$('#user-agree').on('click', function () {
				if ($('#agree-checkbox').is(':checked')) {
					$('#submit-application').removeClass('off')
				} else {
					$('#submit-application').addClass('off')
				}
			});
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");
}