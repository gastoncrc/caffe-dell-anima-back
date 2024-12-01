import { Response, Request } from "express";
import User from "../models/user";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../middlewares/authToken";

export const getAllUsers = async ({}, res: Response) => {
  const users = await User.find({ isActive: true });
  res.json({ users });
  console.log("Todos los usuarios recibidos");
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password } = req.body;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400).json({
      error: true,
      errors: err.array(),
      message: "Hay errores de validación",
    });
    return;
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { ...req.body, password: passwordHash };
    const userCreated = await User.create(newUser);
    const token = await createAccesToken({ email: userCreated.email });
    res.json({
      message: "El usuario ha sido registrado correctamente",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Hubo un error al registrar el usuario",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400).json({
      error: true,
      errors: err.array(),
      message: "Hay errores de validación",
    });
    return;
  }
  try {
    const { id } = req.params;
    const update = req.body;
    await User.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    res
      .status(200)
      .send(`El usuario ${update.name} ha sido actualizado correctamente`);
  } catch (error) {
    console.error("No se ha podido actualizar el usuario", error);
    res.status(500).send("Error al actualizar el usuario");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400).json({
      error: true,
      errors: err.array(),
      message: "Hay errores de validación",
    });
    return;
  }
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    await User.findByIdAndUpdate(id, { isActive: false });
    res.send(`El usuario ${user?.name} ha sido eliminado correctamente`);
  } catch (error) {
    console.error("No se ha podido eliminar el usuario", error);
  }
};

export const userLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({
        message: "El usuario no está registrado",
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Usuario o contraseña inválidos",
      });

    const token = await createAccesToken({ email: userFound.email });
    return res.json({
      message: "El usuario ha sido logueado correctamente",
      token: token,
      name: userFound.name,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Hubo un error al loguear el usuario",
    });
  }
};

export const userLogout = async ({}, res: Response): Promise<any> => {
  try {
    return res.json({
      message: "El usuario ha sido deslogueado correctamente",
      token: "",
      name: "",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Hubo un error al desloguear el usuario",
    });
  }
};
