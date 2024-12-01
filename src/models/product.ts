import { Model, Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  origin: string;
  price: number;
  image: string;
  isActive: boolean;
  feature: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  origin: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  price: {
    type: Number,
    required: [true, "El campo es obligatorio"],
  },
  image: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  feature: {
    type: Boolean,
    default: true,
  },
});

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
