import express, { Express } from "express";
import cors from "cors";
import connectDB from "../database/config";
import productRouter from "../routes/products";
import userRouter from "../routes/users";

export class Server {
  app: Express;
  port: string | number | undefined;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectingDB();
    this.middlewares();
    this.routes();
  }

  async connectingDB(): Promise<void> {
    await connectDB();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes(): void {
    this.app.use("/products", productRouter);
    this.app.use("/users", userRouter);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server connected to port ${this.port}`);
    });
  }
}