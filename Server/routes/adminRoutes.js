import { Router } from "express";
import * as c from "../controller/adminController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/dashboard",auth,role("admin"),c.dashboard);
router.patch("/promote",auth,role("admin"),c.promote);
router.patch("/demote",auth,role("admin"),c.demote);

export default router;
