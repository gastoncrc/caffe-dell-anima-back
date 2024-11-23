import { Response, Request } from "express";
import Product, { IProduct } from "../models/product";

export const getAllProducts = async ({}, res: Response) => {
  const products = await Product.find({ isActive: true });
  res.json({ products });
  console.log("Todos los productos recibidos");
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productCreated = await Product.create(req.body);
    res.send("El producto ha sido creado correctamente");
  } catch (error) {
    console.error("No se ha podido crear el producto", error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, update);
    res.send("El producto ha sido actualizado correctamente");
  } catch (error) {
    console.error("No se ha podido actualizar el producto", error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });
    res.send("El producto ha sido eliminado correctamente");
  } catch (error) {
    console.error("No se ha podido eliminar el producto", error);
  }
};
