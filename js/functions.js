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
// document.querySelector('.mob_menu_link').addEventListener("click", function(e){
//     e.preventDefault();

//     if ( this.classList.contains('active') ) {
//         this.classList.remove('active');

//         document.querySelector('header .menu').classList.remove('visible');
//     } else {
//         this.classList.add('active');

//         document.querySelector('header .menu').classList.add('visible');
//     }
// });


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