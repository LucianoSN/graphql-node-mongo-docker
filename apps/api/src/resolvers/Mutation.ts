import { ProductCreateInput, ProductDeleteInput, Resolver } from '../types';

const createProduct: Resolver<ProductCreateInput> = (_, args, { db }) => {
	const { Product } = db;
	const { data } = args;

	const product = new Product(data);
	return product.save();
};

const deleteProduct: Resolver<ProductDeleteInput> = async (_, args, { db }) => {
	const { Product } = db;
	const { _id } = args;

	return Product.findByIdAndRemove(_id);
};

export default {
	createProduct,
	deleteProduct,
};
