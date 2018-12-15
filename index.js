import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';
const number = 1;
const details = {
    first: '',
    last: '',
    location: ''
}

const result = axios.get(`https://randomuser.me/api/?results=${number}`)
    .then(res => {
        details.first = res.data.results[0].name.first;
        details.last = res.data.results[0].name.last;
        details.city = res.data.results[0].location.city;
        return `${details.first}, ${details.last}, ${details.city}`;
    });

// Type Definations
const typeDefs = `
type Query{
    hello: String!
    name: String!
    city: String!
}
`
// Resolvers

const resolvers = {
    Query: {
        hello() {
            return 'This is my first query in Graph-QL yoga'
        },
        name() {
            return `My name is ${details.first} ${details.last}`
        },
        city() {
            return `I live in ${details.city}`
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