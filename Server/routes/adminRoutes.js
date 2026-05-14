import { Router } from "express";
import * as c from "../controller/adminController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import { mongoIdParam, userIdBodyRules, validate } from "../middleware/validationMiddleware.js";

const router = Router();
const adminOnly = [auth, role("admin")];

router.get("/dashboard", adminOnly, c.dashboard);
router.get("/stats", adminOnly, c.stats);
router.get("/sessions", adminOnly, c.sessions);
router.get("/logs", adminOnly, c.logs);
router.get("/system-health", adminOnly, c.health);
router.get("/users-count", adminOnly, c.userCount);
router.get("/revenue", adminOnly, c.revenue);
router.delete("/user/:id", adminOnly, mongoIdParam("id"), validate, c.deleteUser);
router.patch("/promote", adminOnly, userIdBodyRules, validate, c.promote);
router.patch("/demote", adminOnly, userIdBodyRules, validate, c.demote);

export default router;
