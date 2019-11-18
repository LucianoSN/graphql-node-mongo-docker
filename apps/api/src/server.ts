import {resolve} from 'path';
import {GraphQLServer} from 'graphql-yoga'

const typeDefs = resolve(__dirname, 'schema.graphql');

const USERS = [
    {id: 1, name: 'Tony Stark', email: 'ironman@marvel.com'},
    {id: 2, name: 'Peter Parker', email: 'spiderman@marvel.com'},
    {id: 3, name: 'Steve Rogers', email: 'captain@marvel.com'}
];

const resolvers = {
    User: {
        name: (parent) => {
            console.log('PARENT', parent);
            return `User: ${parent.name}`;
        }
    },
    Query: {
        users: () => USERS
    },
    Mutation: {
        createUser: (parent, args, ctx, info) => {
            const { data } = args;
            const user = {
                ...data,
                id: USERS.length + 1
            };
            USERS.push(user);
            return user;
        }
    }
};

const server = new GraphQLServer({
    resolvers,
    typeDefs,
});

export default server;