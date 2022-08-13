import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  authority: { type: Number, required: true },
  permissions: { type: Array, required: true },
  role: { type: String || Object, required: true },
});

export interface User {
  username: string;
  email: string;
  password: string;
  authority: number;
  permissions: string[];
  role: string;
}
