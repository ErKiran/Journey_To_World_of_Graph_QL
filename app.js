const axios = require('axios');
const number = 1;
const name = {
    first: '',
    last: '',
    city: '',
    dob: '',
    age: '',
    latitude: '',
    longitude: ''
}

const result = axios.get(`https://randomuser.me/api/?results=${number}`)
    .then(res => {
        name.first = res.data.results[0].name.first;
        name.last = res.data.results[0].name.last;
        name.city = res.data.results[0].location.city;
        name.dob = res.data.results[0].dob.date;
        name.age = res.data.results[0].dob.age;
        name.latitude = res.data.results[0].location.coordinates.latitude;
        name.longitude = res.data.results[0].location.coordinates.longitude;


        return `${name.first}, ${name.last}, ${name.city},${name.dob},${name.age},${name.latitude}`;
    });

result.then(res => console.log(res));

