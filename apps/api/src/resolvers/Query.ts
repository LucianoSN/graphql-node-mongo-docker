import {
	OrderByIdArgs,
	OrderDocument,
	PaginationArgs,
	ProductByIdArgs,
	ProductDocument,
	Resolver,
	UserRole,
} from '../types';
import { findDocument } from '../utils';

const orders: Resolver<PaginationArgs> = (_, args, { db, authUser }) => {
	const { _id, role } = authUser;
	const { Order } = db;
	const { skip = 0, limit = 10 } = args;

	const conditions = role === UserRole.USER ? { user: _id } : {};
	return Order.find(conditions)
		.skip(skip)
		.limit(limit <= 20 ? limit : 20);
};

const order: Resolver<OrderByIdArgs> = (_, args, { db, authUser }) => {
	const { _id } = args;
	const { _id: userId, role } = authUser;

	const where = role === UserRole.USER ? { user: userId, _id } : null;

	return findDocument<OrderDocument>({
		db,
		model: 'Order',
		field: '_id',
		value: _id,
		where,
	});
};

const products: Resolver<PaginationArgs> = (_, args, { db }) => {
	const { Product } = db;
	const { skip = 0, limit = 10 } = args;

	return Product.find()
		.skip(skip)
		.limit(limit <= 20 ? limit : 20);
};

const product: Resolver<ProductByIdArgs> = async (_, args, { db }) => {
	const { _id } = args;

	return findDocument<ProductDocument>({
		db,
		model: 'Product',
		field: '_id',
		value: _id,
	});
};

export default { orders, order, products, product };
