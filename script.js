/* --- SCRIPT.JS (INTERACTIVE CONTROLS & ANIMATIONS) --- */
$(document).ready(function() {
    
    // Enable JS animations class
    $('body').addClass('js-enabled');

    // --- CUSTOM CURSOR INTERACTION ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Hover effect for interactive elements
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .service-box, .portfolio-card, .satellite');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- MOBILE MENU TOGGLE ---
    $('.mobile-toggle').on('click', function() {
        $('.main-nav').toggleClass('open');
        $(this).toggleClass('active');
    });

    $('.main-nav a').on('click', function() {
        $('.main-nav').removeClass('open');
        $('.mobile-toggle').removeClass('active');
    });

    // --- SLICK SLIDER INITIALIZATION ---
    $('.portfolio-slider').slick({
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
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

    $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
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

    // --- SCROLL REVEAL & SKILL BARS / COUNTERS TRIGGER ---
    let animated = false;

    function checkScrollAnimations() {
        const windowHeight = $(window).height();
        const scrollPosition = $(window).scrollTop();

        // Reveal Elements Animation
        $('.reveal-up, .reveal-left, .reveal-right').each(function() {
            const elementTop = $(this).offset().top;
            if (scrollPosition > elementTop - windowHeight + 120) {
                $(this).addClass('reveal-active');
            }
        });

        // Skill Bars & Number Counters Activation
        const skillsSection = $('#about').offset().top;
        if (!animated && scrollPosition > skillsSection - windowHeight + 250) {
            
            // Animate Progress Fills for both Technical Breakdown & WP Mastery HUD
            $('.progress-fill, .mini-bar .fill').each(function() {
                const targetWidth = $(this).attr('data-width');
                $(this).css('width', targetWidth + '%');
            });

            // Animate Numerical Counters from 0% to Target Value
            $('.counter').each(function() {
                const $this = $(this);
                const target = parseInt($this.attr('data-target'));
                
                $({ countNum: 0 }).animate({ countNum: target }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum) + '%');
                    },
                    complete: function() {
                        $this.text(this.countNum + '%');
                    }
                });
            });

            animated = true;
        }
    }

    $(window).on('scroll', checkScrollAnimations);
    checkScrollAnimations(); // Check on initial page load

    // --- ACTIVE NAV LINK HIGHLIGHT ON SCROLL ---
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 150;
        
        $('.galactic-section').each(function() {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                $('.main-nav a').removeClass('active');
                $(`.main-nav a[href="#${id}"]`).addClass('active');
            }
        });
    });

    // --- CONTACT FORM SUBMISSION MOCK ---
    $('#galactic-form').on('submit', function(e) {
        e.preventDefault();
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        submitBtn.html('Transmitting Signal... <i class="fa-solid fa-spinner fa-spin"></i>');
        submitBtn.prop('disabled', true);

        setTimeout(() => {
            submitBtn.html('Transmission Successful! <i class="fa-solid fa-check"></i>');
            submitBtn.css('background', 'var(--neon-cyan)');
            this.reset();

            setTimeout(() => {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                submitBtn.css('background', '');
            }, 3500);
        }, 2000);
    });

});
