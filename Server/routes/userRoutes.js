import { Router } from "express";
import * as c from "../controller/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/",auth,c.getUsers);
router.get("/:id",auth,c.getUser);
router.patch("/:id",auth,c.updateUser);
router.delete("/:id",auth,c.deleteUser);
router.patch("/block/:id",auth,c.block);
router.patch("/unblock/:id",auth,c.unblock);

export default router;
