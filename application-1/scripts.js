"use strict";

let numberOfFilms;

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?','');

    while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)){
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?','');
    };
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function rememberMyFilms() {
    for(let i = 0; i < 2; i++){
        const a = prompt('Один из последних просмотренных фильмов?',''),
              b = prompt('На сколько оцените его?','');
    
        if(a != null && b != null && a.length < 50 && b.length < 50 && a != '' && b !='') {
            personalMovieDB.movies[a] = b;
        } else {
            i--;
        } 
    }
}

rememberMyFilms();

function detectPersonalLevel(){
    if(personalMovieDB.count < 10){
        console.log('Просмотрено довольно мало фильмов');
    } else if(personalMovieDB.count >= 10 && personalMovieDB.count <= 30){
        console.log('Вы классический зритель');
    } else if(personalMovieDB.count > 30){
        console.log('Вы киноман');
    } else {
        console.log('Произошла ошибка');
    }
}

detectPersonalLevel();

function whiteYourGenres() {
    for(let i =  0; i < 3; i++){
        personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i + 1}`, '');
    }
}

whiteYourGenres();

function showMyDB(hidden) {
    if(!hidden){
        console.log(personalMovieDB);
    }
}

showMyDB(personalMovieDB.privat);


