import { body, check, param } from "express-validator";
import User from "../models/user";

export const registerUserValidation = () => {
  return [
    check("name")
      .exists()
      .isString()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 3, max: 15 })
      .withMessage("El nombre debe tener entre 3 a 15 caracteres"),
    check("email")
      .isEmail()
      .withMessage("El email es obligatorio")
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error("El correo electrónico ya está en uso");
        }
      }),
    check("password")
      .exists()
      .withMessage("La contraseña es obligatoria")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener mínimo 6 caracteres"),
    check("userRol")
      .optional()
      .isIn(["adm", "user"])
      .withMessage("Rol no válido. Los roles válidos son 'adm', 'user'"),
    check("isActive")
      .optional()
      .isBoolean()
      .withMessage("El estado activo debe ser verdadero o falso"),
    check("verified")
      .optional()
      .isBoolean()
      .withMessage("El estado de verificación debe ser verdadero o falso"),
  ];
};

export const updateUserValidation = () => {
  return [
    param("id")
      .exists()
      .withMessage("El ID de usuario es requerido")
      .isMongoId()
      .withMessage("El ID de usuario no existe"),
    body("name")
      .optional()
      .isString()
      .withMessage("El nombre debe ser un texto")
      .isLength({ min: 3, max: 15 })
      .withMessage("El nombre debe tener entre 3 a 15 caracteres"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Ingrese un email válido")
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        const idFromParams = req.params?.id;
        if (user && idFromParams && user._id.toString() !== idFromParams) {
          throw new Error(
            "El correo electrónico ya está en uso por otro usuario"
          );
        }
      }),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener mínimo 6 caracteres"),
  ];
};

export const deleteUserValidation = () => {
  return [
    param("id")
      .exists()
      .withMessage("El ID de usuario es requerido")
      .isMongoId()
      .withMessage("El ID del usuario no existe"),
  ];
};
