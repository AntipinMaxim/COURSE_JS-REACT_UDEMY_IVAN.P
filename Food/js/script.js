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
    const modalCloseBtn = document.querySelector('.modal__close'),
          modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          timerModal = setTimeout(showModal, 5000);

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

    modalCloseBtn.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal){
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

    new Card(
        "img/tabs/vegy.jpg",
        "vegy", 
        "Меню 'Фитнес'", 
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 
        229,
        ".menu .container",
        'big').render();
    
    
    new Card(
        "img/tabs/elite.jpg",
        "elite", 
        "Меню 'Премиум'", 
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 
        550,
        ".menu .container",
        'biger').render();

    new Card(
        "img/tabs/post.jpg",
        "post", 
        "Меню 'Постное'", 
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 
        430,
        ".menu .container").render();
    
});