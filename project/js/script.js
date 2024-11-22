'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ],
    };
    
    const advBlocks = document.querySelectorAll('.promo__adv img'),
          promoBg = document.querySelector('.promo__bg'),  
          genre = promoBg.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          formAddFilm = document.querySelector('.add'),
          input = formAddFilm.querySelector('.adding__input'),
          checkbox = formAddFilm.querySelector('[type="checkbox"]');
    

    const deleteAdv = (advBlocks) => {
        advBlocks.forEach(adv => adv.remove());
    }

    const makeChanges = () => {
        genre.textContent = 'драма';
        promoBg.style.backgroundImage = 'url(img/bg.jpg)';
    }
    
    const сreateMovieList = (films, parent) => {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}) ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
    }

    const removeFilm = (btn, films) => {
        btn.parentElement.remove();
        films.splice(btn, 1);
        сreateMovieList(movieDB.movies, movieList);
    }

    const sortArr = (arr) => {
        let newArr = [];
    
        arr.forEach((film, i) => {
            newArr[i] = film.toUpperCase();
        });
    
        newArr.forEach((film, i) => {
            arr[i] = film;
        });
        
        arr.sort();
    }
    
    formAddFilm.addEventListener('submit', (e) => {
        e.preventDefault();

        const favorite = checkbox.checked;
    
        if(input.value != '' && input.value.length < 21){
            movieDB.movies.push(input.value);
        } else if(input.value.length > 21){
            let newValue = `${input.value.slice(0, 21)}...`;
            movieDB.movies.push(newValue);
        }

        if(favorite){
            console.log('Добавляем любимый фильм');
        }

        sortArr(movieDB.movies);
        сreateMovieList(movieDB.movies, movieList);

        e.target.reset();
    });

    movieList.addEventListener('click', (e) => {
        if(e.target && e.target.classList.contains('delete')) {
            removeFilm(e.target, movieDB.movies);
        }
    });

    deleteAdv(advBlocks);
    makeChanges();
    сreateMovieList(movieDB.movies, movieList);
    
});
