import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.post("/create-product", createProduct);

productRouter.put("/update-product/:id", updateProduct);

productRouter.delete("/delete-product/:id", deleteProduct);

export default productRouter;
