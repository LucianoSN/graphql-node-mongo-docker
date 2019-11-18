import {resolve} from 'path';
import {GraphQLServer} from 'graphql-yoga'

const typeDefs = resolve(__dirname, 'schema.graphql');

const USERS = [
    {id: 1, name: 'Tony Stark'},
    {id: 2, name: 'Spider Man'},
];

const resolvers = {
    Query: {
        users: () => USERS
    }
};

const server = new GraphQLServer({
    resolvers,
    typeDefs,
});

export default server;