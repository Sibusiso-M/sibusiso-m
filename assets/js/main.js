document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      document.getElementById("navbar_top").classList.add("fixed-top");
      // add padding top to show content behind navbar
      navbar_height = document.querySelector(".navbar").offsetHeight;
      document.body.style.paddingTop = navbar_height + "px";
    } else {
      document.getElementById("navbar_top").classList.remove("fixed-top");
      // remove padding top from body
      document.body.style.paddingTop = "0";
    }
  });
});
// DOMContentLoaded  end

(function ($) {
  var $window = $(window),
    $body = $("body"),
    // $wrapper = $('#wrapper'),
    $header = $("#header"),
    $nav = $("#nav"),
    $main = $("#main"),
    $navPanelToggle,
    $navPanel,
    $navPanelInner;

  // Breakpoints.
  breakpoints({
    default: ["1681px", null],
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  // 	$.fn._parallax = function(intensity) {

  // 		var	$window = $(window),
  // 			$this = $(this);

  // 		if (this.length == 0 || intensity === 0)
  // 			return $this;

  // 		if (this.length > 1) {

  // 			for (var i=0; i < this.length; i++)
  // 				$(this[i])._parallax(intensity);

  // 			return $this;

  // 		}

  // 		if (!intensity)
  // 			intensity = 0.25;

  // 		$this.each(function() {
  //  			var $t = $(this),
  // 				$body = $('body').appendTo($t),
  // 				on, off;

  // 			on = function() {
  //  				$body
  // 					.removeClass('fixed')
  // 					.css('transform', 'matrix(1,0,0,1,0,0)');

  // 				$window
  // 					.on('scroll._parallax', function() {

  // 						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

  // 						// changed
  // 						$body.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

  // 					});

  // 			};

  // 			off = function() {
  // //sibu
  // 				$body
  // 					.addClass('fixed')
  // 					.css('transform', 'none');

  // 				$window
  // 					.off('scroll._parallax');

  // 			};

  // 			// Disable parallax on ..
  // 				if (browser.name == 'ie'			// IE
  // 				||	browser.name == 'edge'			// Edge
  // 				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
  // 				||	browser.mobile)					// Mobile devices
  // 					off();

  // 			// Enable everywhere else.
  // 				else {

  // 					breakpoints.on('>large', on);
  // 					breakpoints.on('<=large', off);

  // 				}

  // 		});

  // 		$window
  // 			.off('load._parallax resize._parallax')
  // 			.on('load._parallax resize._parallax', function() {
  // 				$window.trigger('scroll');
  // 			});

  // 		return $(this);

  // 	};

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Scrolly.
  $(".scrolly").scrolly();

  // Background.
  $wrapper._parallax(1); // original (0.985)
  $body._parallax(1);

  // Nav Panel.

  // Panel.
  $navPanel = $(
    '<div id="navPanel">' +
      "<nav>" +
      "</nav>" +
      '<a href="#navPanel" class="close"></a>' +
      "</div>"
  )
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "right",
      target: $body,
      visibleClass: "is-navPanel-visible",
    });

  // Get inner.
  $navPanelInner = $navPanel.children("nav");

  // Move nav content on breakpoint change.
  var $navContent = $nav.children();

  breakpoints.on(">medium", function () {
    // NavPanel -> Nav.
    $navContent.appendTo($nav);

    // Flip icon classes.
    $nav.find(".icons, .icon").removeClass("alt");
  });

  breakpoints.on("<=medium", function () {
    // Nav -> NavPanel.
    $navContent.appendTo($navPanelInner);

    // Flip icon classes.
    $navPanelInner.find(".icons, .icon").addClass("alt");
  });

  // Hack: Disable transitions on WP.
  if (browser.os == "wp" && browser.osVersion < 10)
    $navPanel.css("transition", "none");

  // Intro.
  var $intro = $("#intro");

  if ($intro.length > 0) {
    // Hack: Fix flex min-height on IE.
    if (browser.name == "ie") {
      $window
        .on("resize.ie-intro-fix", function () {
          var h = $intro.height();

          if (h > $window.height()) $intro.css("height", "auto");
          else $intro.css("height", h);
        })
        .trigger("resize.ie-intro-fix");
    }

    // Hide intro on scroll (> small).
    breakpoints.on(">small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "bottom",
        top: "25vh",
        bottom: "-50vh",
        enter: function () {
          $intro.addClass("hidden");
        },
        leave: function () {
          $intro.removeClass("hidden");
        },
      });
    });

    // Hide intro on scroll (<= small).
    breakpoints.on("<=small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "middle",
        top: "15vh",
        bottom: "-15vh",
        enter: function () {
          $intro.addClass("hidden");
        },
        leave: function () {
          $intro.removeClass("hidden");
        },
      });
    });
  }
})(jQuery);
