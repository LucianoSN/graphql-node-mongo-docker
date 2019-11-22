import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import {
	ProductCreateInput,
	ProductByIdInput,
	ProductUpdateInput,
	Resolver,
	UserSignUpInput,
} from '../types';

import { checkExistence } from '../utils';

const createProduct: Resolver<ProductCreateInput> = (_, args, { db }) => {
	const { Product } = db;
	const { data } = args;

	const product = new Product(data);
	return product.save();
};

const updateProduct: Resolver<ProductUpdateInput> = async (_, args, { db }) => {
	const { Product } = db;
	const { _id, data } = args;

	await checkExistence({
		db,
		model: 'Product',
		field: '_id',
		value: _id,
	});

	return Product.findByIdAndUpdate(_id, data, { new: true });
};

const deleteProduct: Resolver<ProductByIdInput> = async (_, args, { db }) => {
	const { Product } = db;
	const { _id } = args;

	await checkExistence({
		db,
		model: 'Product',
		field: '_id',
		value: _id,
	});

	return Product.findByIdAndRemove(_id);
};

const signup: Resolver<UserSignUpInput> = async (_, args, { db }) => {
	const { User } = db;
	const { data } = args;

	const password = await hash(data.password, 10);

	const user = await new User({
		...data,
		password,
	}).save();

	const { _id: sub, role } = user;

	const token = sign({ sub, role }, process.env.JWT_SECRET, {
		expiresIn: '2h',
	});

	return { token, user };
};

export default {
	createProduct,
	updateProduct,
	deleteProduct,
	signup,
};
