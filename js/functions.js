// Проверка браузера
if ( !supportsCssVars() ) {
	document.getElementsByTagName('body').classList.add("lock");
	document.getElementsByClassName('supports_error').classList.add("show");
}


// Lazy-load
setTimeout(function(){
	const observer = lozad('.lozad', {
		rootMargin: '200px 0px',
		threshold: 0,
		loaded: function(el) {
			el.classList.add('loaded');
		}
	});

	observer.observe();
}, 200);


// Scroll to anchor
document.querySelectorAll('[data-anchor]').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('data-anchor').substring(1);

        const scrollTarget = document.getElementById(href);

        let topOffset = 30; // если не нужен отступ сверху

        if (this.getAttribute('data-offset')) {
            topOffset = this.getAttribute('data-offset');
        }
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });

        if (window.innerWidth < 1025) {
            if (this.closest('header') && document.querySelector('header .menu').classList.contains('visible')) {
                document.querySelector('header .overlay').classList.remove('visible');
                document.querySelector('header .menu').classList.remove('visible');
                document.querySelector('.mob_menu_link').classList.remove('active');
                document.querySelector('body').classList.remove('lock');
            }
        }
    });
});


// Открытие моб меню
const openMenuBtn = document.querySelector('.mob_menu_link'),
      mobMenu = document.querySelector('header .wrap_menu');

openMenuBtn.addEventListener("click", function(e){
    e.preventDefault();

    if ( this.classList.contains('active') ) {
        closeMobMenu(mobMenu, openMenuBtn);
    } else {
        openMobMenu(mobMenu, openMenuBtn);
    }
});

function openMobMenu(menu, btn) {
    btn.classList.add('active');

    menu.classList.add('visible');
}

function closeMobMenu(menu, btn) {
    btn.classList.remove('active');

    menu.classList.remove('visible');
}


// MobSubmenu
document.querySelectorAll('header .menu .item--more').forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('.submenu');

    item.addEventListener('click', (event) => {
        if (window.innerWidth < 1191 && event.target === link || event.target === link.querySelector('span')) {
            event.preventDefault();
            console.log('link');

            if (!item.classList.contains('opened')) {
                item.classList.add('opened');
                submenu.style.height = "auto";

                /** Get the computed height of the container. */
                var height = submenu.clientHeight + "px";

                /** Set the height of the content as 0px, */
                /** so we can trigger the slide down animation. */
                submenu.style.height = "0px";

                /** Do this after the 0px has applied. */
                /** It's like a delay or something. MAGIC! */
                setTimeout(() => {
                    submenu.style.height = height;
                }, 0);
            } else {
                /** Set the height as 0px to trigger the slide up animation. */
                submenu.style.height = "0px";
        
                /** Remove the `active` class when the animation ends. */
                submenu.addEventListener('transitionend', () => {
                    item.classList.remove('opened');
                }, { once: true });
            }
        }
    });
});


// Tabs
document.querySelectorAll(".tabs button").forEach(function(element){
    element.addEventListener("click", function(e){
        e.preventDefault();

        let parent = this.closest(".tabs_container");
        let activeTab = this.getAttribute("data-content");
        let level = this.getAttribute("data-level");

        if ( !this.classList.contains("active") ) {
            this.closest('.tabs').querySelector("button.active").classList.remove("active");

            document.querySelector(activeTab).closest('.tabs_container').querySelectorAll(".tab_content.active." + level).forEach((el) => {
                el.classList.remove("active");
            });

            this.classList.add("active");

            document.querySelector(activeTab).classList.add("active");

            // For a few tab_content
            document.querySelectorAll('[data-id="' + activeTab + '"]').forEach((el) => {
                el.classList.add("active");
            });
        }
    });
});


// Изменение количества товара
document.querySelectorAll(".amount .minus").forEach((element) => {
    element.addEventListener("click", function(e){
        e.preventDefault();

        let parent = this.closest('.amount');
        let input = parent.querySelector('input');
        let inputVal = parseFloat( input.value );
        let minimum = parseFloat( input.getAttribute('data-minimum') );
        let step = parseFloat( input.getAttribute('data-step') );

        if( inputVal > minimum ){
            input.value = inputVal-step;
        }
    });
});
document.querySelectorAll(".amount .plus").forEach((element) => {
    element.addEventListener("click", function(e){
        e.preventDefault();

        let parent = this.closest('.amount');
        let input = parent.querySelector('input');
        let inputVal = parseFloat( input.value );
        let maximum = parseFloat( input.getAttribute('data-maximum') );
        let step = parseFloat( input.getAttribute('data-step') );

        if( inputVal < maximum ){
            input.value = inputVal+step;
        }
    });
});



// Вспомогательные функции
function supportsCssVars() {
    var s = document.createElement('style'),
        support;

    s.innerHTML = ":root { --tmp-var: bold; }";
    document.head.appendChild(s);
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'));
    s.parentNode.removeChild(s);

    return support;
}


function setHeight(className){
    let maxheight = 0;

    className.each(function() {
    	let elHeight = this.offsetHeight;

        if( elHeight > maxheight ) {
        	maxheight = elHeight;
        }
    });

    className.each(function() {
    	this.style.height = maxheight + 'px';
    });
}


const customSelect = function(path) {
    const selectBoxes = document.querySelectorAll(path);

    selectBoxes.forEach(select => {
        const parent = select.parentElement,
              options = select.querySelectorAll('option'),
              selectBox = document.createElement('div'),
              selectBoxUl = document.createElement('ul'),
              current = document.createElement('span');

        current.classList.add('current');
        selectBox.classList.add('custom-select__box');
        selectBoxUl.classList.add('list');
        if (options.length > 10) {
            selectBoxUl.classList.add('scroll');
        }

        createOptionsList(options, selectBoxUl, current);

        selectBox.append(current);
        selectBox.append(selectBoxUl);
        parent.append(selectBox);

        selectBox.addEventListener('click', (event) => {
            if (selectBox.classList.contains('open')) {
                selectBox.classList.remove('open');
            } else{
                selectBox.classList.add('open');
            }


            if ((event.target.classList.contains('option') && !event.target.classList.contains('disabled')) || (event.target.classList.contains('span') && !event.target.parentElement.classList.contains('disabled'))) {
                const dataValue = () => {
                    if (event.target.classList.contains('span')) {
                        return event.target.parentElement.getAttribute('data-value');
                    } else{
                        return event.target.getAttribute('data-value');
                    }
                };

                options.forEach(option => {
                    option.selected = false;

                    if (dataValue() === option.value) {
                        option.selected = true;
                    }
                });

                createOptionsList(options, selectBoxUl, current);
            }
        });

        document.addEventListener('click', (event) => {
            if (event.target !== selectBox && event.target !== selectBox && event.target !== current) {
                selectBox.classList.remove('open');
            }
        });
    });


    function createOptionsList(options, parent, current) {
        parent.innerHTML = '';

        options.forEach(option => {
            const newOption = document.createElement('li');

            newOption.classList.add('option');
            newOption.innerHTML = `<span class="span">${option.innerHTML}</span>`;
            newOption.setAttribute('data-value', option.value);

            if (option.selected) {
                newOption.classList.add('selected');
                current.innerText = option.innerHTML;
            }

            if (option.disabled) {
                newOption.classList.add('disabled');
            }

            parent.append(newOption);
        });
    }
};

const simpleRating = function(path) {
    const ratings = document.querySelectorAll(path);

    ratings.forEach(rating => {
        const stars = rating.querySelectorAll('.simple-rating__item');

        stars.forEach(star => {
            star.children[0].style.pointerEvents = 'none';

            star.addEventListener('mouseenter', (event) => {
                let prevSibling = event.target.previousElementSibling;

                event.target.classList.add('hover');

                while(prevSibling) {
                    prevSibling.classList.add('hover');
                    prevSibling = prevSibling.previousElementSibling;
                }
            });
            star.addEventListener('mouseleave', () => {
                stars.forEach(star => {
                    star.classList.remove('hover');
                });
            });

            
            star.addEventListener('click', (event) => {
                stars.forEach(star => {
                    star.classList.remove('active');
                });

                let prevSibling = event.target.previousElementSibling;

                event.target.classList.add('active');

                while(prevSibling) {
                    prevSibling.classList.add('active');
                    prevSibling = prevSibling.previousElementSibling;
                }
            });
        });
    });
};

const anchorScroll = function(path, offset) {
    const links = document.querySelectorAll(path);

    links.forEach(link => {
        const linkOffset = link.getAttribute('data-offset') || offset || 0;
        const href = link.getAttribute('data-anchor').substring(1);

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPosition = document.getElementById(href).getBoundingClientRect().top - linkOffset;

            window.scrollBy({
                top: targetPosition,
                behavior: 'smooth'
            });

            closeMobMenu(mobMenu, openMenuBtn);
        });
    });
};


const accordion = function(path) {
    const accordions = document.querySelectorAll(path);

    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.item');

        items.forEach(item => {
            const openBtns = item.querySelectorAll('.open_btn');
            const data = item.querySelector('.data');

            openBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    if (!item.classList.contains('active')) {
                        items.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                closeItem(otherItem);
                            }
                        });
                        
                        item.classList.add('active');
                        data.style.height = "auto";
    
                        /** Get the computed height of the container. */
                        var height = data.clientHeight + "px";
    
                        /** Set the height of the content as 0px, */
                        /** so we can trigger the slide down animation. */
                        data.style.height = "0px";
    
                        /** Do this after the 0px has applied. */
                        /** It's like a delay or something. MAGIC! */
                        setTimeout(() => {
                            data.style.height = height;
                        }, 0);
                    } else{
                        closeItem(item);
                    }
                });
            });
        });
    });

    function closeItem(item) {
        const data = item.querySelector('.data');
        /** Set the height as 0px to trigger the slide up animation. */
        data.style.height = "0px";

        /** Remove the `active` class when the animation ends. */
        data.addEventListener('transitionend', () => {
            item.classList.remove('active');
        }, { once: true });
    }
};