import { Router } from "express";
import userRoutes from "./userRoute";
import loginRoutes from "./loginRoute";
import * as userController from "../controller/userController";
import auth from "../middlewares/authenticate";

const router = Router();
router.post("/register", userController.createUser);
router.use("/login", loginRoutes);
router.use("/users", userRoutes);
router.use(auth);

export default router;
