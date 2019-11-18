import { resolve } from 'path';
import { GraphQLServer } from 'graphql-yoga';

const typeDefs = resolve(__dirname, 'schema.graphql');

const USERS = [
	{ id: 1, name: 'Tony Stark', email: 'ironman@marvel.com' },
	{ id: 2, name: 'Peter Parker', email: 'spiderman@marvel.com' },
	{ id: 3, name: 'Steve Rogers', email: 'captain@marvel.com' },
];

const resolvers = {
	User: {
		name: (parent): string => {
			// console.log('PARENT', parent);
			return `User1: ${parent.name}`;
		},
	},
	Query: {
		users: (): typeof USERS => USERS,
	},
	Mutation: {
		createUser: (parent, args): typeof USERS[0] => {
			const { data } = args;
			const user = {
				...data,
				id: USERS.length + 1,
			};
			USERS.push(user);
			return user;
		},
	},
};

const server = new GraphQLServer({
	resolvers,
	typeDefs,
});

export default server;
