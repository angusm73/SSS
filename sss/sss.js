/** Super Simple Slider by @intllgnt
Extra mods + hax by Angus Moore **/

;(function($, window, document, undefined) {

$.fn.sss = function(options) {

	// Options
	var settings = $.extend({
		slideShow:	true,
		startOn:	0,
		speed:		3500,
		transition:	400,
		arrows:		true
	}, options);

	return this.each(function() {

		// Variables
		var wrapper			= $(this),
			slides			= wrapper.children().wrapAll('<div class="sss"/>').addClass('ssslide'),
			slider			= wrapper.find('.sss'),
			slide_count		= slides.length,
			transition		= settings.transition,
			starting_slide	= settings.startOn,
			target			= starting_slide > slide_count - 1 ? 0 : starting_slide,
			animating		= false,
			clicked,
			timer,
			key,
			prev,
			next,

		// Reset Slideshow
		reset_timer = settings.slideShow ? function() {
			clearTimeout(timer);
			timer = setTimeout(next_slide, settings.speed);
		} : $.noop;

		// Get the height as a percentage of the width
		function get_height(target) {
			return ((slides.eq(target).outerHeight() / slider.width()) * 100) + '%';
		}

		// Animate Slider
		function animate_slide(target) {
			if (!animating) {
				animating = true;
				var target_slide = slides.eq(target);

				target_slide.fadeIn(transition);
				slides.not(target_slide).fadeOut(transition);

				slider.animate({paddingBottom: get_height(target)}, transition,  function() {
					animating = false;
				});

				reset_timer();

				// UPDATE NAV DOT'S
				dots = wrapper.find('.sssdots').children();
				dots.eq(target).addClass('active').siblings().removeClass('active');

			}
		}

		// Next Slide
		function next_slide() {
			target = target === slide_count - 1 ? 0 : target + 1;
			animate_slide(target);
		}

		// Prev Slide
		function prev_slide() {
			target = target === 0 ? slide_count - 1 : target - 1;
			animate_slide(target);
		}

		// Create arrows if setting is true
		if (settings.arrows) {
			slider.append('<div class="sssprev"/>', '<div class="sssnext"/>');

			// Generate Navigation Dots
			dotnav = $('<div class="sssdots"></div>');
			for (var i = 0; i < slide_count; i++) {
				dotnav.append('<span class="sssdot"></span>');
			}
			dotnav.children().eq(starting_slide).addClass('active');
			slider.append(dotnav);
		}

		next = slider.find('.sssnext');
		prev = slider.find('.sssprev');

		// Slide on arrow key press
		$(document).on('keydown', function(e) {
			var key = (e.keyCode ? e.keyCode : e.which);
			if (key === 39) { next_slide(); }
			else if (key === 37) { prev_slide(); }
		});

		$(document).on('click', '.sssdots .sssdot', function() {

			// Update target and animate slide in
			target = $(this).index();
			animate_slide(target);
		});

		// Bind click events and animate default height and slide when document is ready
		$(document).ready(function() {
			slider.css({paddingBottom: get_height(target)});
			next.click(next_slide);
			prev.click(prev_slide);
			animate_slide(target);
		});

	});

};
})(jQuery, window, document);
