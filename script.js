$(document).ready(function() {
    
    // Section Switching Logic
    $('.main-nav a, .hero-btns a').on('click', function(e) {
        var target = $(this).attr('href');
        
        // Check if it's an internal section link
        if(target.startsWith('#')) {
            e.preventDefault();
            
            // Highlight active navigation link
            $('.main-nav a').removeClass('active');
            $('.main-nav a[href="' + target + '"]').addClass('active');
            
            // Fade out current section and fade in target section
            $('.awilo-section').removeClass('active-section');
            $(target).addClass('active-section');

            // Close mobile menu if open
            $('.awilo-header').removeClass('open');
        }
    });

    // Mobile Menu Toggler
    $('.mobile-menu-toggler').on('click', function() {
        $('.awilo-header').toggleClass('open');
    });

    // Simple Contact Form Handler
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your message has been sent successfully.');
        this.reset();
    });

});