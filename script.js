$(window).on('load', function() {

    // Smooth Scrolling & Navigation Highlighting via Scroll Position
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop();

        // Highlight active navbar link on scroll
        $('.galactic-section').each(function() {
            var top = $(this).offset().top - 150;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');

            if (scrollPos >= top && scrollPos < bottom) {
                $('.main-nav a').removeClass('active');
                $('.main-nav a[href="#' + id + '"]').addClass('active');
            }
        });

        // Add subtle header shadow on scroll
        if (scrollPos > 50) {
            $('.galactic-header').css('box-shadow', '0 10px 30px rgba(0,0,0,0.5)');
        } else {
            $('.galactic-header').css('box-shadow', 'none');
        }
    });

    // Mobile Navigation Menu Toggle
    $('.mobile-toggle').on('click', function() {
        $('.main-nav').toggleClass('open');
    });

    // Close mobile menu when clicking a link
    $('.main-nav a').on('click', function() {
        $('.main-nav').removeClass('open');
    });

    // Initialize Portfolio Slider with robust responsive breakpoints
    if ($('.portfolio-slider').length) {
        $('.portfolio-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false
                    }
                }
            ]
        });
    }

    // Initialize Testimonials Slider with responsive breakpoints
    if ($('.testimonials-slider').length) {
        $('.testimonials-slider').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        arrows: false
                    }
                }
            ]
        });
    }

    // Force Slick sliders to recalculate width metrics on resize / device rotation
    $(window).on('resize', function() {
        $('.portfolio-slider, .testimonials-slider').slick('setPosition');
    });

    // Contact Form Submission Simulation
    $('#galactic-form').on('submit', function(e) {
        e.preventDefault();
        alert('Transmission successful! Your message has been beamed across the galaxy.');
        this.reset();
    });

});
