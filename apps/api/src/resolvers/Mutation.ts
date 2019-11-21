import {
	ProductCreateInput,
	ProductDeleteInput,
	ProductUpdateInput,
	Resolver,
} from '../types';

const createProduct: Resolver<ProductCreateInput> = (_, args, { db }) => {
	const { Product } = db;
	const { data } = args;

	const product = new Product(data);
	return product.save();
};

const updateProduct: Resolver<ProductUpdateInput> = (_, args, { db }) => {
	const { Product } = db;
	const { _id, data } = args;

	return Product.findByIdAndUpdate(_id, data, { new: true });
};

const deleteProduct: Resolver<ProductDeleteInput> = async (_, args, { db }) => {
	const { Product } = db;
	const { _id } = args;

	return Product.findByIdAndRemove(_id);
};

export default {
	createProduct,
	updateProduct,
	deleteProduct,
};
