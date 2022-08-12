import { Router } from "express";
import * as loginController from "../controller/loginController";

const router = Router();

router.post("/", loginController.loginUser);

export default router;
