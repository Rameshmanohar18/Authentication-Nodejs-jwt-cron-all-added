import { Router } from "express";
import * as c from "../controller/sessionController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/",auth,c.getSessions);
router.delete("/:id",auth,c.deleteSession);

router.delete("/all/remove",auth,c.deleteAll);
router.get("/active",auth,c.active);
router.get("/history",auth,c.history);
router.get("/device",auth,c.device);
router.patch("/extend/:id",auth,c.extend);
router.get("/count",auth,c.count);
router.post("/invalidate",auth,c.invalidate);
router.post("/create",auth,c.create);



export default router;
