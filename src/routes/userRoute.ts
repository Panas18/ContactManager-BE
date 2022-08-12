import { Router } from "express";
import * as userController from "../controller/userController";

const router = Router();

router.get("/", userController.getAllUsers);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export default router;
