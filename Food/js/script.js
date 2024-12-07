'use strict';

window.addEventListener('DOMContentLoaded', () => {

    //TABS

    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsWrapper = document.querySelector('.tabheader__items'),
          tabs = tabsWrapper.querySelectorAll('.tabheader__item');

    
    const hideTabs = () => {
        tabsContent.forEach((item, i) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    const showTabs = (i = 0) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    tabsWrapper.addEventListener('click', (event)=> {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabs();
                    showTabs(i);
                }
            });
        }
    });

    hideTabs();
    showTabs();


    //Timer

    const deadline = '2024-11-28';

    const getTimerRemaining = (endtime) => {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - new Date();

        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), 
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60 ) % 60),
            seconds = Math.floor(t / 1000 % 60);
        }

        return{
            t,
            days,
            hours,
            minutes,
            seconds
        }       
    }

    function getZero(num){
        if(num < 10) {
            num = `0${num}`;
        }
        return num;
    }

    const setTimer = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),    
              timeInterval = setInterval(updateTimer, 1000);
        
        updateTimer();

        function updateTimer() {
            const total = getTimerRemaining(endtime);

            days.textContent = getZero(total.days);
            hours.textContent = getZero(total.hours);
            minutes.textContent = getZero(total.minutes);
            seconds.textContent = getZero(total.seconds);

            if(total.t <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setTimer('.timer', deadline);


    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          timerModal = setTimeout(showModal, 50000);

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');

        document.body.style.overflow = 'hidden';

        clearTimeout(timerModal);
        window.removeEventListener('scroll', showModalByScroll);
    };

    const closeModal = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');

        document.body.style.overflow = '';
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () =>{
            showModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        } 
    }

    window.addEventListener('scroll', showModalByScroll);

    // CardMenu

    class Card {
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classesName) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classesName = classesName;
            this.parent = document.querySelector(parentSelector);
            this.changeToRub();
        }

        changeToRub() {
           this.price = Math.floor(this.price * 0.37);
        }

        render(){
           const element = document.createElement('div');

            if(this.classesName.length === 0) {
                element.classList.add('menu__item');
            } else{
                element.classList.add('menu__item');
                this.classesName.forEach(className =>{
                    element.classList.add(className);
                })
            }
                
           element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
        `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) =>{
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();

    }

    // getResource('http://localhost:3000/menu')
    // .then(res => {
    //     res.forEach(({img, altimg, title, descr, price}) => {
    //         new Card(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             ".menu .container",
    //             'big'
    //         ).render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
    .then(res => {
        res.data.forEach(({img, altimg, title, descr, price}) => {
            new Card(
                img,
                altimg,
                title,
                descr,
                price,
                ".menu .container",
                'big'
            ).render();
            });
    });

    // Forms

    const statusMessage = {
          loading: 'img/form/spinner.svg',
          succsess: 'Спасибо скоро мы с вами свяжемся!',
          failure: 'Что-то пошло не так'
        }

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        bindPostDate(form);
    })
    
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostDate(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const blockMessage = document.createElement('img');
            blockMessage.src = statusMessage.loading;
    
            form.append(blockMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(statusMessage.succsess);
                blockMessage.remove();
            }).catch(()=>{
                showThanksModal(statusMessage.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message){
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        showModal();

        const modal = document.createElement('div');
        modal.classList.add('modal__dialog');

        modal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(modal);

        setTimeout(function(){
            modal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModal();
        },2000)
    }

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width,
          slider = document.querySelector('.offer__slider'),
          carouselIndicators = document.createElement('div'),
          dots = [];

    let slideIndex = 1,
        offset = 0;

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    addZero();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slide, i) => {
        slide.style.width = width;

        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        if(i == 0){
            dot.style.opacity = 1;
        }
    
        carouselIndicators.append(dot);

        dots.push(dot);
    })

    function addZero() {
        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function deletNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function changeOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function changeByX() {
        slidesField.style.transform = `translateX(-${offset}px)`
    }

    next.addEventListener('click', () =>{
        if(offset == deletNotDigits(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += deletNotDigits(width);
        }

        changeByX();

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero();

        changeOpacity();
    })

    prev.addEventListener('click', () =>{
        if(offset == 0){
            offset = deletNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deletNotDigits(width);
        }

        changeByX();

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero();

        changeOpacity();
    })

    // carouselIndicator

    carouselIndicators.classList.add('carousel-indicators');

    slider.style.position = 'relative';
    slider.append(carouselIndicators);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', e => {
            slideIndex = i + 1;
            offset = deletNotDigits(width) * (slideIndex - 1);
            changeByX();

            addZero();

            changeOpacity();
        })
    });

})