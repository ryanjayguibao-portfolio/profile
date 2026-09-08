$(document).ready(function() {

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

    // Contact Form Submission Simulation
    $('#galactic-form').on('submit', function(e) {
        e.preventDefault();
        alert('Transmission successful! Your payload has been sent across the galaxy.');
        this.reset();
    });

});
