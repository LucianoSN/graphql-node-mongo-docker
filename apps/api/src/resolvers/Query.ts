import { ProductByIdInput, Resolver, UserRole } from '../types';
import { checkExistence } from '../utils';

const orders: Resolver<{}> = (_, args, { db, authUser }) => {
	const { _id, role } = authUser;
	const { Order } = db;

	const conditions = role === UserRole.USER ? { user: _id } : {};
	return Order.find(conditions);
};

const products: Resolver<{}> = (_, args, { db }) => db.Product.find();

const product: Resolver<ProductByIdInput> = async (_, args, { db }) => {
	const { Product } = db;
	const { _id } = args;

	await checkExistence({
		db,
		model: 'Product',
		field: '_id',
		value: _id,
	});

	return Product.findById(_id);
};

export default { orders, products, product };
