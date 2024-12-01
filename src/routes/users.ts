import { Router } from "express";
import {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  userLogin,
  userLogout,
} from "../controllers/users";
import {
  registerUserValidation,
  updateUserValidation,
  deleteUserValidation,
} from "../middlewares/usersValidations";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register-user", registerUserValidation(), registerUser);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.put("/update-user/:id", updateUserValidation(), updateUser);
userRouter.patch("/delete-user/:id", deleteUserValidation(), deleteUser);

export default userRouter;
