'use strict';

let studends = {
    js: [{
        name: 'John',
        progress: 100
    }, {
        name: 'Ivan',
        progress: 60
    }],

    html: {
        basic: [{
            name: 'Peter',
            progress: 20
        },{
            name: 'Anna',
            progress: 18
        }],

        pro: [{
            name: 'Sam',
            progress: 10
        }]
    }
};

function totalProgressStudends(data){
    if(Array.isArray(data)) {
        let total = 0;

        for(let i = 0; i < data.length; i++){
            total += data[i].progress;
        }

        return [total, data.length];

    } else {
        let total = [0, 0];

        for(let subData of Object.values(data)){
            const subDataArr = totalProgressStudends(subData);
            total[0] += subDataArr[0];
            total[1] += subDataArr[1];
        }
        return total;
    }
};

console.log(totalProgressStudends(studends)[0]/totalProgressStudends(studends)[1]);