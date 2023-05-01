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