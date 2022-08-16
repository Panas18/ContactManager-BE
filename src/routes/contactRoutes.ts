import { Router } from "express";
import * as contactController from "../controller/contactController";
import storage from "../misc/multer";

const router = Router();
router.get("/", contactController.getAllContacts);
router.get("/:contact_id", contactController.getContactById);
router.post("/add", storage.single("photo"), contactController.addContact);
router.put("/:contact_id", contactController.updateContact);
router.delete("/:contact_id", contactController.deleteContact);
export default router;
