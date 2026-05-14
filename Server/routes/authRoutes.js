import { Router } from "express";
import * as c from "../controller/authController.js";
import { deleteSession, getSessions } from "../controller/sessionController.js";
import auth from "../middleware/authMiddleware.js";
import rateLimit from "../middleware/rateLimitMiddleware.js";
import {
  changePasswordRules,
  loginRules,
  registerRules,
  validate
} from "../middleware/validationMiddleware.js";

const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

router.post("/register", authLimiter, registerRules, validate, c.register);
router.post("/login", authLimiter, loginRules, validate, c.login);
router.post("/refresh-token", c.refreshToken);
router.post("/logout", auth, c.logout);
router.delete("/logout-all", auth, c.logoutAll);
router.get("/me", auth, c.me);
router.patch("/change-password", auth, changePasswordRules, validate, c.changePassword);
router.post("/forgot-password", authLimiter, c.forgotPassword);
router.post("/reset-password", authLimiter, c.resetPassword);
router.post("/verify-email", c.verifyEmail);
router.post("/resend-verification", authLimiter, c.resendVerification);
router.get("/sessions", auth, getSessions);
router.delete("/session/:id", auth, deleteSession);

export default router;
