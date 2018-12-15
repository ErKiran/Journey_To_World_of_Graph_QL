import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';
const number = 1;
const details = {
    first: '',
    last: '',
    city: '',
    dob: '',
    age: '',
    latitude: '',
    longitude: ''
}

axios.get(`https://randomuser.me/api/?results=${number}`)
    .then(res => {
        details.first = res.data.results[0].name.first;
        details.last = res.data.results[0].name.last;
        details.city = res.data.results[0].location.city;
        details.latitude = res.data.results[0].location.coordinates.latitude;
        details.longitude = res.data.results[0].location.coordinates.longitude;


        return `
        ${details.first},
         ${details.last},
          ${details.city},
          ${details.latitude}
          ,${details.longitude}
          `;
    });

// Type Definations
const typeDefs = `
type Query{
    name: String!
    city: String!
    coordinates: String!
}
`
// Resolvers

const resolvers = {
    Query: {
        name() {
            return `My name is ${details.first} ${details.last}`
        },
        city() {
            return `I live in ${details.city}`
        },
        coordinates() {
            return `Here is my latitude ${details.latitude} and longitude ${details.longitude}`
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Hurray! Server is up and running')
});