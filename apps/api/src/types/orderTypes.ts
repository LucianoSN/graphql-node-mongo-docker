import { Schema, Document, Types } from 'mongoose';
import { OrderItemCreateInput, OrderItemSubdocument, User } from '.';

export enum OrderStatus {
	WAITING_PAYMENT,
	IN_QUEUE,
	PREPARING,
	READY,
	ON_THE_WAY,
	DELIVERED,
}

export interface Order {
	_id: Schema.Types.ObjectId;
	user: User;
	total: number;
	status: OrderStatus;
	items: Types.DocumentArray<OrderItemSubdocument>;
	createdAt: string;
	updatedAt: string;
}

export interface OrderDocument extends Order, Document {
	_id: Schema.Types.ObjectId;
}

export interface OrderByIdInput {
	_id: Schema.Types.ObjectId;
}

type OrderCreateInput = Pick<Order, 'status' | 'user'>;

export interface OrderCreateArs {
	data: OrderCreateInput & {
		items: OrderItemCreateInput[];
	};
}

export interface OrderDeleteArgs {
	_id: Schema.Types.ObjectId;
}
