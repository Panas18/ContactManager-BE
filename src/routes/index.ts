import { Router } from "express";
import userRoutes from "./userRoute";
import * as userController from "../controller/userController";

const router = Router();
router.post("/register", userController.createUser);
router.use("/user", userRoutes);

export default router;
