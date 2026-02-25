$(document).ready(function () {
    var $navbar = $('.navbar'),
        $body = $('body'),
        $window = $(window),
        $hamSymb = $('[data-hamburger]'),
	$document = $(document),
        navOffsetTop;

    function init() {
        $window.on('scroll', onScroll);
        $window.on('resize', resize);
	$hamSymb.on('click', eatHamburger);
	$document.on('click', closeHamburger);
        $('a[href^="#"]:not([href="#"])').on('click', smoothScroll);

	// Tab click behavior
	// $('.button-primary').on('click', tabClick);

	addLocalDateTime();
        resize();
    }

    function resize() {
	closeHamburger();
        $body.removeClass('has-docked-nav');
        navOffsetTop = $navbar.offset().top;
        onScroll();
	
    }

    function addLocalDateTime() {
	$(".upcoming-talk-time[data-utc]").each(function () {
	    if (this.dataset.localAppended === "true") return;
	    var utcDateTime = new Date(this.dataset.utc.replace(" ", "T") + ":00Z");
	    if (isNaN(utcDateTime)) return;
	    var localDate = utcDateTime.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "2-digit",
		year: "numeric"
	    });
	    var localTime = utcDateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZoneName: "short"
            });
            this.textContent += "  (" + localDate + " at " + localTime + ")";
            this.dataset.localAppended = "true";
	});
    }

    function smoothScroll(e) {
        e.preventDefault();
	closeHamburger();
        var target = this.hash,
            $target = $(target),
            offset = $navbar.outerHeight();
        $(document).off("scroll", onScroll);
        $('html, body').animate({
            scrollTop: $target.offset().top - (1.5*offset)
        }, 600, 'swing', function () {
	    history.pushState(null, null, target);
            $(document).on("scroll", onScroll);
        });
    }

    function rotateHamburger(deg) {
	$hamSymb.css('transform', `rotate({$deg}deg)`);
    }
    
    function eatHamburger(e) {
	e.preventDefault();
	var hamburger = $($(e.currentTarget).data('hamburger'));
	if(!hamburger.hasClass('open')) {
	    rotateHamburger(90);
	} else {
	    rotateHamburger(0);
	}
	toggleHamburger();
	e.stopImmediatePropagation();
    }
    
    function toggleHamburger() {
	$('.hamburger').toggleClass('open');
    }

    function closeHamburger() {
	$('.hamburger').removeClass('open');
	rotateHamburger(0);
    }
 
    function onScroll() {
	closeHamburger();
        if ($window.scrollTop() > navOffsetTop && !$body.hasClass('has-docked-nav')) {
            $body.addClass('has-docked-nav');
        } else if ($window.scrollTop() <= navOffsetTop && $body.hasClass('has-docked-nav')) {
            $body.removeClass('has-docked-nav');
        }
    }

    init();
});
