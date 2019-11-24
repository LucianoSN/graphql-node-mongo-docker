import { Document, Model, Types } from 'mongoose';
import {
	CheckExistenceOptions,
	OrderItemSubdocument,
	TokenPayload,
} from './types';
import { CustomError } from './erros';
import { sign, SignOptions } from 'jsonwebtoken';

const isMongoId = (value: string): boolean => Types.ObjectId.isValid(value);

const findDocument = async <T extends Document>(
	opts: CheckExistenceOptions
): Promise<T> => {
	const {
		model,
		db,
		field,
		value,
		where,
		message,
		errorCode,
		extensions,
	} = opts;

	if (field === '_id' && !isMongoId(value)) {
		throw new CustomError(
			`Invalid ID value for '${value}'!`,
			'INVALID_ID_ERROR'
		);
	}

	const document = await ((db[model] as unknown) as Model<T>)
		.findOne(where || { [field]: value })
		.exec();

	if (!document) {
		throw new CustomError(
			message || `${model} with ${field} '${value}' not found!`,
			errorCode || 'NOT_FOUND_ERROR',
			extensions
		);
	}

	return document;
};

const issueToken = (payload: TokenPayload, options?: SignOptions): string =>
	sign(payload, process.env.JWT_SECRET, { expiresIn: '2h', ...options });

const findOrderItem = (
	items: Types.DocumentArray<OrderItemSubdocument>,
	_id: string,
	operation: 'update' | 'delete'
): OrderItemSubdocument => {
	if (!isMongoId(_id))
		throw new CustomError(
			`Invalid ID value for ${_id} in item to ${operation}!`,
			'INVALID_ID_VALUE_ERROR'
		);

	const item = items.id(_id);

	if (!item)
		throw new CustomError(
			`Item with id '${_id}' not found to ${operation}!`,
			'NOT_FOUND_ERROR'
		);

	return item;
};

export { isMongoId, findOrderItem, findDocument, issueToken };
