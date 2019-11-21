import { Resolver } from '../types';

const products: Resolver<{}> = (_, args, ctx) => ctx.db.Product.find();

export default { products };
