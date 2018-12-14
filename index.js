import { GraphQLServer } from 'graphql-yoga';
const name = {
    first: 'Kiran',
    last: 'Adhikari'
}

// Type Definations
const typeDefs = `
type Query{
    hello: String!
    name: String!
}
`
// Resolvers

const resolvers = {
    Query: {
        hello() {
            return 'This is my first query in Graph-QL yoga'
        },
        name() {
            return `My name is ${name.first} ${name.last}`
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