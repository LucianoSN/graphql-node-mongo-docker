import {resolve} from 'path';
import {GraphQLServer} from 'graphql-yoga'

const typeDefs = resolve(__dirname, 'schema.graphql');

const server = new GraphQLServer({
    typeDefs
});

export default server;