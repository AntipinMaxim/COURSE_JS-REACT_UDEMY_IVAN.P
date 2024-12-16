'use strict';
    import tabs from './modules/tabs';
    import modal from './modules/modal';
    import timer from './modules/timer';
    import cards from './modules/cards';
    import slider from './modules/slider';
    import forms from './modules/forms';
    import calc from './modules/calc';
    import { showModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const timerModal = setTimeout(() => showModal('.modal', timerModal), 30000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', timerModal);
    timer('.timer', '2024-12-31');
    cards();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    forms('form', timerModal);
    calc();
          
})