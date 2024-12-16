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

export default slider;