// import { Response, Request } from "express";
// import User from "../models/user";

// export const getProductsCart = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const userId = req.user?.id; // Asegúrate de que el middleware de autenticación inyecte `req.user`

//     if (!userId) {
//       res.status(401).json({ message: "Usuario no autenticado" });
//       return;
//     }
//     const user = await User.findById(userId).populate("cart.productId");
//     if (!user) {
//       res.status(404).json({ message: "Usuario no encontrado" });
//       return;
//     }
//     res.status(200).json(user.cart);
//   } catch (error) {
//     console.error("Error al obtener el carrito:", error);
//     res.status(500).json({ message: "Error al obtener el carrito" });
//   }
// };
