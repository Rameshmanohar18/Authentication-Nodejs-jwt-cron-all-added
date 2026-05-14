import { Router } from "express";
import * as c from "../controller/sessionController.js";
import auth from "../middleware/authMiddleware.js";
import { mongoIdParam, validate } from "../middleware/validationMiddleware.js";

const router = Router();

router.delete("/all/remove", auth, c.deleteAll);
router.get("/active", auth, c.active);
router.get("/history", auth, c.history);
router.get("/device", auth, c.device);
router.get("/count", auth, c.count);
router.post("/invalidate", auth, c.invalidate);
router.post("/create", auth, c.create);

router.get("/", auth, c.getSessions);
router.delete("/:id", auth, mongoIdParam("id"), validate, c.deleteSession);
router.patch("/extend/:id", auth, mongoIdParam("id"), validate, c.extend);

export default router;
