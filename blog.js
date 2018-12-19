import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';
import { Secret } from './config/secret';
const number = 5;
const details = [{
    id: '',
    email: '',
    username: '',
    age: ''
}]
const blog = [{
    title: '',
    body: '',
    published: ''
}]
axios.get(`https://randomuser.me/api/?results=${number}`)
    .then(res => {
        for (i = 0; i < 4; i++) {
            details.id = res.data.results[i].login.uuid;
            details.email = res.data.results[i].email;
            details.username = res.data.results[i].login.username;
            details.age = res.data.results[i].dob.age;
        }
        return `
        ${details.id},
        ${details.email},
        ${details.username},
        ${details.age}
        `
    }).catch(err => err);
axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${Secret}`)
    .then(res => {
        blog.body = res.data.articles[2].content;
        blog.title = res.data.articles[2].title;
        blog.published = res.data.articles[2].publishedAt
        return `
            ${blog.title},
            ${blog.published},
            ${blog.body}`
    })
    .catch(err => err);

const typeDefs = `
    type Query{
    users: [User!]!
    me: User!
    blogs: Post!
   }
    type User{
        id: ID!
        username: String!
        email: String
        age: Int!
    }
    type Post{
        title: String!
        body: String!
        published: String!
    }
`
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            return users
        },
        me() {
            return {
                id: details.id,
                email: details.email,
                username: details.username,
                age: details.age
            }
        },
        blogs() {
            return {
                title: blog.title,
                body: blog.body,
                published: blog.published
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