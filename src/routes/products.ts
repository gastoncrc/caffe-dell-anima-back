import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getFeaturesProducts,
  // deleteProduct,
  // updateProduct,
} from "../controllers/products";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.get("/feature-product", getFeaturesProducts);

productRouter.post("/create-product", createProduct);

// productRouter.put("/update-product/:id", updateProduct);

// productRouter.delete("/delete-product/:id", deleteProduct);

export default productRouter;
