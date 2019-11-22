import { Models } from '.';
import { ContextParameters } from 'graphql-yoga/dist/types';

export interface Context extends ContextParameters {
	db: Models;
}
