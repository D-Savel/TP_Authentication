import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const collectionName = 'tp_users';


export const UserModel = model(
  "User",
  UserSchema,
  collectionName
);
