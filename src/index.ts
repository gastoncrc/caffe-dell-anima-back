// import { Server } from "./models/server";
// import dotenv from "dotenv";

// dotenv.config();

// const server = new Server();
// server.listen();

import { VercelRequest, VercelResponse } from "@vercel/node"; // Importa los tipos de Vercel
import { Server } from "./models/server";

const server = new Server();

export default (req: VercelRequest, res: VercelResponse) => {
  // Pasa la solicitud y la respuesta a la instancia de Express
  server.app(req, res);
};
