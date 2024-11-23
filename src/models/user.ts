import { Model, Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  userRol: string;
  isActive: boolean;
  verified: boolean;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  userRol: {
    type: String,
    required: [true, "El campo es obligatorio"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
