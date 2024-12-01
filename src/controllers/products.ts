import { Response, Request } from "express";
import Product, { IProduct } from "../models/product";
import cloudinary from "../utils/cloudinary";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const products = await Product.find({ isActive: true });
    res.json({ products });
    console.log("Productos recibidos correctamente");
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getFeaturesProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const featureProducts = await Product.find({ feature: true });
    res.json({ products: featureProducts });
    console.log("Productos recibidos correctamente");
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, origin, price, isActive } = req.body;
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ message: "No se ha subido ninguna imagen" });
    }
    const file = req.files.image as any;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "caffe-dell-anima-images",
    });
    const productCreated = await Product.create({
      name,
      origin,
      price,
      image: result.secure_url,
      isActive,
    });
    res.send("El producto ha sido creado correctamente");
  } catch (error) {
    console.error("No se ha podido crear el producto", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// export const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const update = req.body;
//     const updatedProduct = await Product.findOneAndUpdate({ _id: id }, update);
//     res.send("El producto ha sido actualizado correctamente");
//   } catch (error) {
//     console.error("No se ha podido actualizar el producto", error);
//   }
// };

// export const deleteProduct = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Product.deleteOne({ _id: id });
//     res.send("El producto ha sido eliminado correctamente");
//   } catch (error) {
//     console.error("No se ha podido eliminar el producto", error);
//   }
// };
