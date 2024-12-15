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
}

module.exports = cards;