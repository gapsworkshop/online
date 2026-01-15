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

        resize();
	
	// Auto-select today's tab based on data-date
	// defaultProgram();
    }

    /*function tabClick(e) {
	const $button = $(e.currentTarget);
	const dayId = $button.data('dayid');
	$('.button-primary').removeClass('active');
	$('.days-program').removeClass('active');
	$button.addClass('active');
	$('#' + dayId).addClass('active');
    }*/

    /*function defaultProgram() {
	const today = new Date().toLocaleDateString('en-CA');
	let $matchedButton = null;
	let earliestDate = null;
	let latestDate = null;
	let $firstButton = null;
	let $lastButton = null;

	$('.button-primary').each(function (index) {
	    const $btn = $(this);
	    const date = $btn.data('date');

	    if (index === 0) {
		$firstButton = $btn;
		earliestDate = date;
	    }

	    $lastButton = $btn; // Will end up as the last item
	    latestDate = date;

	    if (date === today) {
		$matchedButton = $btn;
	    }
	});

	if ($matchedButton) {
	    $matchedButton.trigger('click');
	} else if (today < earliestDate) {
	    $firstButton.trigger('click');
	} else if (today > latestDate) {
	    $lastButton.trigger('click');
	}
    }*/
    
    function resize() {
	closeHamburger();
        $body.removeClass('has-docked-nav');
        navOffsetTop = $navbar.offset().top;
        onScroll();
	
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
