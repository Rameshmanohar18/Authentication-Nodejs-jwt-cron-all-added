import { Router } from "express";
import * as c from "../controller/userController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import { mongoIdParam, roleRules, validate } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/search/:q", auth, c.search);
router.get("/active/all", auth, c.activeUsers);
router.get("/inactive/all", auth, c.inactiveUsers);
router.get("/stats/all", auth, c.stats);
router.get("/recent/all", auth, c.recent);
router.patch("/role/change", auth, role("admin"), roleRules, validate, c.changeRole);
router.post("/avatar", auth, c.uploadAvatar);
router.delete("/avatar/remove", auth, c.removeAvatar);

router.get("/", auth, c.getUsers);
router.get("/:id", auth, mongoIdParam("id"), validate, c.getUser);
router.patch("/:id", auth, mongoIdParam("id"), validate, c.updateUser);
router.delete("/:id", auth, role("admin"), mongoIdParam("id"), validate, c.deleteUser);
router.patch("/block/:id", auth, role("admin"), mongoIdParam("id"), validate, c.block);
router.patch("/unblock/:id", auth, role("admin"), mongoIdParam("id"), validate, c.unblock);

export default router;
