// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
	// Form interactions
		window.registerForm = {
			visible: false,
			show_trigger: $('#show-form'),
			agree_checkbox: $('#agree-checkbox'),
			submit_btn: $('#submit-application'),
			agree_trigger: $('#user-agree'),
			toggleListener: function(){
				// Listener to able/disable submit form
				this.agree_trigger.on('click', function(event) {
					if (registerForm.agree_checkbox.is(':checked')) {
						// registerForm.submit_btn.removeClass('off')
						registerForm.submit_btn.removeAttr('disabled')
					} else {
						// registerForm.submit_btn.addClass('off')
						registerForm.submit_btn.attr('disabled', true)
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
			clickListener: function(){
				this.show_trigger.on('click', function(event) {
					event.preventDefault();
					registerForm.show();
					$('html, body').animate({
						scrollTop: $('#register-section').offset().top
					}, 2000);
				});
			},
			sendListener: function(){
				this.submit_btn.on('click', function(e) {
					e.preventDefault();
					if($('#name-input').val() == "" || $('#email-input').val() == "" || $('#phone-input').val() == "" ){
						alert("You must fill all fields to complete the request!");
					} else {
						$.ajax({
							url: "send_data.php",
							type: "POST",
							data: { name: $('#name-input').val(), email: $('#email-input').val(), tel: $("#phone-input").val() }
						})
						.done(function(e) {
							// console.log("e",e);
							registerForm.success();
						});
					}
				});
			},
			activateListeners: function(){
				this.toggleListener();
				this.scrollListener();
				this.clickListener();
				this.sendListener();
			},

			success: function(){
				$('.form-footer').fadeOut(700);
				$('#application-fields').fadeOut(700, function(){
					$('#success-message').html("<h4 class='ac-shift'> <span class='ac-target'> You're one step closer. We'll get back to you soon with details to win the sponsorship. </span> </h4> ");
					$('#success-submit').html("<span class='ac-shift'> <span class='ac-target'> Submitted. </span> </h4> ");
					$('#success-message').find('.ac-target').addClass('show');
					$('#success-submit').find('.ac-target').addClass('show');
				});
			},

			show: function(){
				this.visible = true;
				$('#main-wrapper').addClass('showForm');
			},
			hide: function(){
				this.visible = false;
				$('#main-wrapper').removeClass('showForm');
			},

			init: function(){
				// Check agreement status and able/disable submit button
				if (this.agree_checkbox.is(':checked')) {
					registerForm.submit_btn.removeClass('off');
				}

				this.activateListeners();
			}
		}

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

	// Hidden objects
		window.hiddenElements = {
			objs: $('.ac-mask').find('span'),
			show: function(){
				$.each(hiddenElements.objs, function(index, el) {
					setTimeout(function(){
				       $(el).addClass('show');
				    }, ( index * 100 ));
				});
			}
		}

	// Sponsor includes shifter
		window.sponsorIncludes = {
			firstObjs: $('#include-1').find('.ac-shift').find('span'),
			secondObjs: $('#include-2').find('.ac-shift').find('span'),
			thirdObjs: $('#include-3').find('.ac-shift').find('span'),
			interval: 5000,
			counter: 1,

			toggle: function(objArray, show){
				$.each(objArray, function(index, el) {
					setTimeout(function(){
						if(show){
							$(el).addClass('show');
						} else {
							$(el).removeClass('show');
						}
				    }, ( index * 50 ));
				});
			},

			shift: function(){
				if (this.counter == 1) {
					sponsorIncludes.toggle(sponsorIncludes.firstObjs);
					sponsorIncludes.toggle(sponsorIncludes.secondObjs, true);
					sponsorIncludes.counter = 2;
				} else if (this.counter == 2) {
					sponsorIncludes.toggle(sponsorIncludes.secondObjs);
					sponsorIncludes.toggle(sponsorIncludes.thirdObjs, true);
					sponsorIncludes.counter = 3;
				} else if (this.counter == 3) {
					sponsorIncludes.toggle(sponsorIncludes.thirdObjs);
					sponsorIncludes.toggle(sponsorIncludes.firstObjs, true);
					sponsorIncludes.counter = 1;
				}
			},

			init: function(){
				setInterval(function(){
					sponsorIncludes.shift();
				}, this.interval);
			}
		}

	// Loader
		window.acLoader = {
			placeLogo: function(){
				$('.brand-c-container').removeClass('loading');
			},
			layBoxes: function(){
				$('#hero-section').removeClass('loading');
			},

			openCurtain: function(){
				$('#loading-curtain').addClass('loaded');

				setTimeout(function(){
					$('#loading-curtain').remove();
					hiddenElements.show();
					sponsorIncludes.init();

					setTimeout(function(){
						$('.badge').removeClass('loading');
					},5000);
				}, 1300);
			},

			init: function(){
				// setTimeout(function(){
				// 	acLoader.placeLogo();
				// 	setTimeout(function(){
				// 		acLoader.layBoxes();
				// 	},1800);
				// }, 1800);

				this.openCurtain();
			}
		}
});


// Trigger functions after page is completely loaded
window.onload = function() {
	// Do something, remove preloader perhaps
	acLoader.init();
	registerForm.init();

	// Show hidden texts
	// hiddenElements.show();

	// Activate interval of Includes in "sponsor" section
	// sponsorIncludes.init();
}