document.addEventListener('DOMContentLoaded', () => {
    const mainSlider = new Swiper('.main_slider .slider', {
        speed: 750,
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });


    document.querySelectorAll('.reviews .slider').forEach(slider => {
        const slides = slider.querySelectorAll('.swiper-slide');
        const cloneSlides = [];

        slides.forEach(cloneSlide => {
            cloneSlides.push(cloneSlide.cloneNode(true));
        });

        const sliderReviews = new Swiper(slider, {
            speed: 750,
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 4,
                }
            },
            on: {
                beforeInit: function (swiper) {
                    // console.log(swiper);
                    changeSLides(swiper);
                }
            },
        });

        sliderReviews.on('resize', function (swiper) {
            changeSLides(swiper);
            
            setTimeout(() => {
                swiper.update();
            }, 300);
        });
    });


    function changeSLides(slider, slides) {
        const wrapper = slider.slidesEl;
        const reviews = wrapper.querySelectorAll('.review');

        if (window.innerWidth >= 1025) {
            wrapper.innerHTML = '';

            reviews.forEach(element => {
                element.classList.add('swiper-slide');
                wrapper.append(element);
            });
        }
    }

    
    customSelect('.custom-select select');

    simpleRating('.simple-rating');

    accordion('.accordion');

    anchorScroll('[data-anchor]', 20);

    timer('.timer');

    modal('[data-modal]');
});