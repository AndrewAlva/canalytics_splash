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
					}, 1400);
				});
			},
			sendListener: function(){
				this.submit_btn.on('click', function(e) {
					e.preventDefault();
					if($('#name-input').val() == "" || $('#email-input').val() == "" || $('#phone-input').val() == "" || $('#state-input').val() == "" || $('#farmtype-select').val() == "" || $('#farmsize-input').val() == "" || $('#plants-input').val() == "" || $('#growcycles-select').val() == "" || $('#yields-input').val() == ""){
						alert("You must fill all fields to complete the request!");
					} else {
						$.ajax({
							url: "send_data.php",
							type: "POST",
							data: { name: $('#name-input').val(), email: $('#email-input').val(), tel: $("#phone-input").val(), state: $("#state-input").val(), farmtype: $("#farmtype-select").val(), farmsize: $("#farmsize-input").val(), plants: $("#plants-input").val(), growcycles: $("#growcycles-select").val(), yields: $("#yields-input").val() }
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
				$('#apply-cta').removeClass('show');
				$('#success-message').html("<h4 class='ac-shift'> <span class='ac-target'> You're one step closer. We'll get back to you soon with details to win the sponsorship. </span> </h4> ");
				
				$('#application-fields').fadeOut(700, function(){
					$('#apply-cta').html("Application<br><span>Submitted.</span>");
					$('#apply-cta').addClass('show');
					$('#success-message').find('.ac-target').addClass('show');
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

		// AC square inputs functionalty
			// Select option input, special interaction
				var ac_select_wrappers, default_select;
				var ac_selected_item, ac_options_list, ac_option;

				function create_selects(){
					// Look for any elements with the class "custom-select"
					ac_select_wrappers = document.getElementsByClassName("ac-select-container");
					for (var i = 0; i < ac_select_wrappers.length; i++) {
						default_select = ac_select_wrappers[i].getElementsByTagName("select")[0];

						// For each custom select wrapper, create a new "div" that will act as the selected item, and the first item 
						ac_selected_item = document.createElement("div");
						ac_selected_item.setAttribute("class", "option-selected");
						ac_selected_item.innerHTML = default_select.options[default_select.selectedIndex].innerHTML;

						ac_select_wrappers[i].appendChild(ac_selected_item);

						// For each custom select wrapper, create a new "div" that will contain the options list
						ac_options_list = document.createElement("div");
						ac_options_list.setAttribute("class", "select-items select-hide");
						
						for (var j = 0; j < default_select.length; j++) {
							/* For each option in the original select element,
				    		create a new "div" that will act as an option item */
							ac_option = document.createElement("div");
							ac_option.innerHTML = default_select.options[j].innerHTML;

							// When an item is clicked, update the original select box, and the selected item
							ac_option.addEventListener("click", function(e){
								var s,h,y;
								s = this.parentNode.parentNode.getElementsByTagName("select")[0]; /* This is equal to "default_select" */
						        h = this.parentNode.previousSibling; /* Same as "selected_item" */
						        for (k = 0; k < s.length; k++) {
						        	// Find what is the option selected
							        if (s.options[k].innerHTML == this.innerHTML) {
							        	// Select the current option at the real <select> element
							            s.selectedIndex = k;

							            // Update the content of "selected_item" div
							            h.innerHTML = this.innerHTML;

							            // Find the previous selected option and remove its active class
							            y = this.parentNode.getElementsByClassName("same-as-selected");
							            for (l = 0; l < y.length; l++) {
							            	y[l].removeAttribute("class");
							            }

							            // Set the "active" class on the new option
							            this.setAttribute("class", "same-as-selected");
							            break;
							        }
						        }

					            // Find <select> element and add 'filled' class to
					            // set label on top as if input was filled
					            this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.classList.add("filled");

						        h.click();
							});
							// Write the options into the custom <select> list
							ac_options_list.appendChild(ac_option);
						};

						// Write the complete list of options into the custom <select> wrapper
						ac_select_wrappers[i].appendChild(ac_options_list);

						/* When the select box is clicked, close any other select boxes,
				      	and open/close the current select box */
				      	ac_selected_item.addEventListener("click", function(e) {
							e.stopPropagation();
						    closeAllSelect(this);
						    this.nextSibling.classList.toggle("select-hide");
						    this.classList.toggle("select-arrow-active");

						    $(this.parentNode).addClass('opened');

						    /* Dropdowns extra action to close them
						    since stopPropagation() interfers with it */
						    if (typeof ab_dropdowns !== 'undefined') {
						    	close_ab_dropdowns();
						    }
						});
					};
				}

				/* A function that will close all select boxes in the document,
				except the current select box */
				function closeAllSelect(elmnt) {
					var x, y, arrNo = [];
					x = document.getElementsByClassName("select-items");
					y = document.getElementsByClassName("option-selected");

					for (var i = 0; i < y.length; i++) {
						if (elmnt == y[i]) {
							arrNo.push(i)
						} else {
							y[i].classList.remove("select-arrow-active");
						}
					}

					for (var i = 0; i < x.length; i++) {
						if (arrNo.indexOf(i)) {
							x[i].classList.add("select-hide");
						}
					}

					for (var i = 0; i < ac_select_wrappers.length; i++) {
						$(ac_select_wrappers[i]).removeClass('opened');
					};
				}

			// Create custom select options lists as inputs of forms
		        if(typeof create_selects !== 'undefined'){
		        	create_selects();
		        }

		        $(document).on("click", function(e) {
		    		// Custom select inputs: open/close
		    		if(typeof create_selects !== 'undefined'){
		    			closeAllSelect();
		    		}
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