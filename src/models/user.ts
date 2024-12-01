import mongoose, { Model, Schema, model } from "mongoose";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  adress: string;
  city: string;
  country: string;
  password: string;
  userRol: string;
  isActive: boolean;
  verified: boolean;
  cart: String;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  surname: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  adress: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  city: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  country: {
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
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
