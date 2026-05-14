import { Router } from "express";
import * as c from "../controller/adminController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/dashboard",auth,role("admin"),c.dashboard);
router.get("/stats",auth,role("admin"),c.stats);
router.get("/sessions",auth,role("admin"),c.sessions);
router.get("/logs",auth,role("admin"),c.logs);
router.get("/system-health",auth,role("admin"),c.health);

router.delete("/user/:id",auth,role("admin"),c.deleteUser);
router.patch("/promote",auth,role("admin"),c.promote);
router.patch("/demote",auth,role("admin"),c.demote);
router.get("/users-count",auth,role("admin"),c.userCount);
router.get("/revenue",auth,role("admin"),c.revenue);






export default router;
