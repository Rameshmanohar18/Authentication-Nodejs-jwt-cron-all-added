import { Router } from "express";
import * as c from "../controller/authController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",c.register);
router.post("/login",c.login);
router.post("/logout",auth,c.logout);
router.get("/me",auth,c.me);
router.patch("/change-password",auth,c.changePassword);

export default router;
