import { resolve } from 'path';
import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import { context } from './config';
import { catchErrorsMiddleware } from './middlewares';
import { AuthDirective } from './directives';

const typeDefs = resolve(__dirname, 'schema.graphql');

const server = new GraphQLServer({
	resolvers,
	typeDefs,
	context,
	middlewares: [catchErrorsMiddleware],
	schemaDirectives: {
		auth: AuthDirective,
	},
});

export default server;
