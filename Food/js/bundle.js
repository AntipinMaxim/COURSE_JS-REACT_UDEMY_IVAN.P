/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');
    let height, weight, age, sex, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);

            if(element.getAttribute('id') === localStorage.getItem('sex')){
                element.classList.add(activeClass);
            }

            if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                element.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calculateResult () {
        if(height && weight && age && sex && ratio){
            if(sex === 'female'){
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 *height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        } else {
            result.textContent = '____';
        }
    }

    calculateResult();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if(element.getAttribute('data-ratio')) {
                    ratio = +element.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +element.getAttribute('data-ratio'));    
                } else {
                    sex = element.getAttribute('id');
                    localStorage.setItem('sex', element.getAttribute('id'));
                }

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                })

                e.target.classList.add(activeClass);

                calculateResult();
            });

        });
    }

    function getInputInformation(selector){
        const inputs = document.querySelectorAll(selector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                switch (input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                
                    case 'weight':
                        weight = +input.value;
                        break;

                    case 'age':
                        age = +input.value;
                        break;
                };

                calculateResult();

                if(input.value.match(/\D/g)){
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
            })
        })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getInputInformation('.calculating__choose_medium input');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


function cards() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");



function forms (formSelector, timerModal) {
    // Forms

    const statusMessage = {
        loading: 'img/form/spinner.svg',
        succsess: 'Спасибо скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
      }

  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
      bindPostDate(form);
  })

  function bindPostDate(form){
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const blockMessage = document.createElement('img');
          blockMessage.src = statusMessage.loading;
  
          form.append(blockMessage);

          const formData = new FormData(form);
          const json = JSON.stringify(Object.fromEntries(formData.entries()));
          
          (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
          .then(data => {
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', timerModal);

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
          (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
      },2000)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });
function showModal(selectorModal, timerModal) {
    modal = document.querySelector(selectorModal);
    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
    if(timerModal){
        clearTimeout(timerModal);
    }
};

const closeModal = (selectorModal) => {
    modal = document.querySelector(selectorModal);
    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = '';
};

function modal(triggerModal, selectorModal, timerModal) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerModal),
          modal = document.querySelector(selectorModal);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () =>{
            showModal(selectorModal, timerModal);
        });
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(selectorModal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal(selectorModal);
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal(selectorModal, timerModal);
            window.removeEventListener('scroll', showModalByScroll);
        } 
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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

const getResource = async (url) =>{
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();

}



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, nextArrow, prevArrow, slide, totalCounter, currentCounter, wrapper, field}) {
     // Slider

     const slides = document.querySelectorAll(slide),
     prev = document.querySelector(prevArrow),
     next = document.querySelector(nextArrow),
     total = document.querySelector(totalCounter),
     current = document.querySelector(currentCounter),
     slidesWrapper = document.querySelector(wrapper),
     slidesField = document.querySelector(field),
     width = window.getComputedStyle(slidesWrapper).width,
     slider = document.querySelector(container),
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        //TABS

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsWrapper = document.querySelector(tabsParentSelector);

  
    const hideTabs = () => {
        tabsContent.forEach((item, i) => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
          item.classList.remove(activeClass);
        });
    }
    

    const showTabs = (i = 0) => {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');

      tabs[i].classList.add(activeClass);
    }

    tabsWrapper.addEventListener('click', (event)=> {
      const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
        //Timer

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

    setTimer(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    
    
    
    
    
    
    
    

window.addEventListener('DOMContentLoaded', () => {

    const timerModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', timerModal), 30000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', timerModal);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2024-12-31');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', timerModal);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
          
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map