import { Router } from "express";
import * as userController from "../controller/userController";

const router = Router();

router.get("/", userController.getAllUsers);
router.put("/:user_id", userController.updateUser);
router.delete("/:user_id", userController.deleteUser);
router.get("/email", userController.getUserByEmail);
router.get("/:user_id", userController.getUserById);

export default router;
