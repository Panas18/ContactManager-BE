import { Router } from "express";
// import userRoutes from "./userRoute";
import loginRoutes from "./loginRoute";
import * as userController from "../controller/userController";
import contactRoutes from "./contactRoutes";
import auth from "../middlewares/authenticate";

const router = Router();
router.post("/register", userController.createUser);
router.use("/login", loginRoutes);
router.use(auth);

// protected route
router.use("/contact", contactRoutes);

export default router;
