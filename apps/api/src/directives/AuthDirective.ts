import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLField, defaultFieldResolver } from 'graphql';
import { Context } from '../types';
import { CustomError } from '../erros';

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field: GraphQLField<any, Context>): void {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = (...args): any => {
			if (this.args.role === 'ADMIN') {
				throw new CustomError('Unauthorized', 'UNAUTHORIZED_ERROR');
			}

			return resolve.apply(this, args);
		};
	}
}

export { AuthDirective };
