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

    const sliderReviews = new Swiper('.reviews .slider', {
        speed: 750,
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    
    customSelect('.custom-select select');

    simpleRating('.simple-rating');

    accordion('.accordion');

    anchorScroll('[data-anchor]', 20);
});