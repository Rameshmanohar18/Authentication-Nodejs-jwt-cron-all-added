import { Router } from "express";
import * as c from "../controller/authController.js";
import { deleteSession, getSessions } from "../controller/sessionCongtroller.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",c.register);
router.post("/login",c.login);
router.post("/logout",auth,c.logout);
router.get("/me",auth,c.me);
router.patch("/change-password",auth,c.changePassword);
router.post("/forgot-password",c.forgotPassword);
router.post("/reset-password",c.resetPassword);
router.post("/verify-email",c.verifyEmail);
router.post("/resend-verification",c.resendVerification);
router.get("/sessions",auth,getSessions);
router.delete("/session/:id",auth,deleteSession);
router.delete("/logout-all",auth,c.logoutAll);



export default router;
