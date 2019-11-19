import { Schema, Document } from 'mongoose';

export interface ProductTypes {
	_id: Schema.Types.ObjectId;
	name: String;
	description: String;
	price: Number;
	unit: String;
}

export interface ProductDocument extends ProductTypes, Document {
	_id: Schema.Types.ObjectId;
}
