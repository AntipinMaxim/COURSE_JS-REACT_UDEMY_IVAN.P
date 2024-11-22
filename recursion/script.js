'use strict';

let students = {
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

function totalProgressStudents (data) {
    if(Array.isArray(data)){
        let total = 0;

        for(let i = 0; i < data.length; i++){
            total += data[i].progress;
        }

        return [total, data.length];
    } else {
        let total = [0, 0];

        for (const obj of Object.values(data)) {
            let arr = totalProgressStudents(obj);

            total[0] += arr[0];
            total[1] += arr[1];
        }

        return total;
    }
}

let total = totalProgressStudents(students);

console.log(total[0]/total[1]);