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

module.exports = calc;