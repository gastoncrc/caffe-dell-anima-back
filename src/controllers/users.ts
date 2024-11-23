import { Response, Request } from "express";
import User from "../models/user";
import { validationResult } from "express-validator";

export const getAllUsers = async ({}, res: Response) => {
  const users = await User.find({ isActive: true });
  res.json({ users });
  console.log("Todos los usuarios recibidos");
};

export const registerUser = async (
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
    await User.create(req.body);
    res.send("El usuario ha sido registrado correctamente");
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
