import { Schema, Document } from 'mongoose';

export enum UserRole {
	USER,
	ADMIN,
}

export interface User {
	_id: Schema.Types.ObjectId;
	name: String;
	email: String;
	password: String;
	role: UserRole;
}

export interface UserDocument extends User, Document {
	_id: Schema.Types.ObjectId;
}
