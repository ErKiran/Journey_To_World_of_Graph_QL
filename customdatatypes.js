import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';
const number = 1;
const details = {
    id: '',
    email: '',
    username: '',
    age: ''
}
const locations = {
    city: '',
    postcode: ''
}


axios.get(`https://randomuser.me/api/?results=${number}`)
    .then(res => {
        details.id = res.data.results[0].login.uuid;
        details.email = res.data.results[0].email;
        details.username = res.data.results[0].login.username;
        details.age = res.data.results[0].dob.age;
        locations.city = res.data.results[0].location.city;
        locations.postcode = res.data.results[0].location.postcode;
        return `
        ${details.id},
        ${details.email},
        ${details.username},
        ${details.age},
        ${locations.city},
        ${locations.postcode}
        `
    });

// Type Definations
const typeDefs = `
type Query{
    gretting(name: String): String
    me: User!
    address: Location!
    grades: [Int!]!
}
type User {
    id: ID!
    email: String!
    age: Int!
    username: String!
}
type Location {
    city: String!
    postcode: Int!
}
`
// Resolvers

const resolvers = {
    Query: {
        me() {
            return {
                id: details.id,
                email: details.email,
                username: details.username,
                age: details.age
            }
        },
        gretting(parents, args, ctx, info) {
            if (args.name) {
                return `Hello ${args.name}`
            } else {
                return 'Hello'
            }
        },
        grades(parents,args,ctx,info){
            return [10,20,30]
        },
        address() {
            return {
                city: locations.city,
                postcode: locations.postcode
            }
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