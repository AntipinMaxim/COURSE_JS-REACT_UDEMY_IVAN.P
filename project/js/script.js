/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

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

        document.querySelectorAll('.delete').forEach((btn, i) =>{
            btn.addEventListener('click', (e) => {
                btn.parentElement.remove();
                films.splice(i, 1);

                сreateMovieList(films, parent);
            });
        });
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

    deleteAdv(advBlocks);
    makeChanges();
    сreateMovieList(movieDB.movies, movieList);
    
});
