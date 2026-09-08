// Add js-enabled class immediately so animations work when JS is active
document.documentElement.classList.add('js-enabled');

$(document).ready(function() {

    // --- CUSTOM INTERACTIVE CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth > 1024 && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            cursorOutline.style.transform = `translate(${posX - 18}px, ${posY - 18}px)`;
        });

        $('a, button, .service-box, .portfolio-card, input, textarea').on('mouseenter', function() {
            $('body').addClass('cursor-hover');
        }).on('mouseleave', function() {
            $('body').removeClass('cursor-hover');
        });
    }

    // --- INTERSECTION OBSERVER SCROLL REVEALS ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const scrollObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('reveal-active');

                if ($(entry.target).find('.progress-fill, .fill').length > 0) {
                    animateProgressBars();
                }
                if ($(entry.target).find('.counter').length > 0) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    $('.reveal-up, .reveal-left, .reveal-right').each(function() {
        scrollObserver.observe(this);
    });

    // --- PROGRESS BAR FILL ANIMATION ---
    let progressAnimated = false;
    function animateProgressBars() {
        if (progressAnimated) return;
        progressAnimated = true;

        $('.progress-fill, .mini-bar .fill').each(function() {
            var targetWidth = $(this).attr('data-width') || $(this).css('width');
            $(this).css('width', targetWidth + '%');
        });
    }

    // --- NUMBER COUNTER ANIMATION ---
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        $('.counter').each(function() {
            var $this = $(this);
            var target = parseInt($this.attr('data-target'));
            
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
    }

    // --- SMOOTH SCROLL & ACTIVE NAVBAR HIGHLIGHTING ---
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop();

        $('.galactic-section').each(function() {
            var top = $(this).offset().top - 120;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');

            if (scrollPos >= top && scrollPos < bottom) {
                $('.main-nav a').removeClass('active');
                $('.main-nav a[href="#' + id + '"]').addClass('active');
            }
        });

        if (scrollPos > 40) {
            $('.galactic-header').css({
                'box-shadow': '0 8px 25px rgba(0,0,0,0.5)',
                'background': 'rgba(3, 4, 11, 0.95)'
            });
        } else {
            $('.galactic-header').css({
                'box-shadow': 'none',
                'background': 'rgba(3, 4, 11, 0.85)'
            });
        }
    });

    // --- MOBILE NAVIGATION TOGGLE ---
    $('.mobile-toggle').on('click', function() {
        $('.main-nav').toggleClass('open');
    });

    $('.main-nav a').on('click', function() {
        $('.main-nav').removeClass('open');
    });

    // --- INITIALIZE SLIDERS SAFELY ON WINDOW LOAD ---
    $(window).on('load', function() {
        if ($('.portfolio-slider').length && !$('.portfolio-slider').hasClass('slick-initialized')) {
            $('.portfolio-slider').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3500,
                arrows: true,
                dots: true,
                responsive: [
                    { breakpoint: 1024, settings: { slidesToShow: 2 } },
                    { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } }
                ]
            });
        }

        if ($('.testimonials-slider').length && !$('.testimonials-slider').hasClass('slick-initialized')) {
            $('.testimonials-slider').slick({
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: true,
                dots: true,
                responsive: [
                    { breakpoint: 992, settings: { slidesToShow: 1, arrows: false } }
                ]
            });
        }
    });

    $(window).on('resize', function() {
        $('.portfolio-slider, .testimonials-slider').slick('setPosition');
    });

    // --- CONTACT FORM SUBMISSION ---
    $('#galactic-form').on('submit', function(e) {
        e.preventDefault();
        alert('Transmission successful! Your message has been beamed across the galaxy.');
        this.reset();
    });

});
