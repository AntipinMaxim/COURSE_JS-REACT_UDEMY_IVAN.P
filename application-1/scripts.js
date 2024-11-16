"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function() {4
        this.count = +prompt('Сколько фильмов вы уже посмотрели?','');
    
        while(this.count == '' || this.count == null || isNaN(this.count)){
            this.count = +prompt('Сколько фильмов вы уже посмотрели?','');
        };
        console.log(this.count);
    },

    rememberMyFilms: function() {
        for(let i = 0; i < 2; i++){
            const a = prompt('Один из последних просмотренных фильмов?','').trim(),
                  b = prompt('На сколько оцените его?','');
        
            if(a != null && b != null && a.length < 50 && b.length < 50 && a != '' && b !='') {
                personalMovieDB.movies[a] = b;
            } else {
                i--;
            } 
        }
    },

    detectPersonalLevel: function(){
        if(personalMovieDB.count < 10){
            console.log('Просмотрено довольно мало фильмов');
        } else if(personalMovieDB.count >= 10 && personalMovieDB.count <= 30){
            console.log('Вы классический зритель');
        } else if(personalMovieDB.count > 30){
            console.log('Вы киноман');
        } else {
            console.log('Произошла ошибка');
        }
    },

    whiteYourGenres: function() {
        for(let i =  0; i < 3; i++){
            personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i + 1}`, '');
            if(personalMovieDB.genres[i] != null && personalMovieDB.genres[i] != ''){
                continue;
            } else{
                i--;
            }
        };
        personalMovieDB.genres.forEach((element, i) => {
            console.log(`Любимый жанр #${i + 1} - это ${element}`);
        });
    },

    showMyDB: function(hidden) {
        if(!hidden){
            console.log(personalMovieDB);
        }
    },

    toggleVisibleMyDB: function() {
        if(this.privat){
            this.privat = false;
        } else {
            this.privat = true;
        }
    }
};

// personalMovieDB.start();
// personalMovieDB.rememberMyFilms();
// personalMovieDB.detectPersonalLevel();
personalMovieDB.whiteYourGenres();
// personalMovieDB.toggleVisibleMyDB(personalMovieDB.privat);
personalMovieDB.showMyDB(personalMovieDB.privat);



