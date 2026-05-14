import { Router } from "express";
import * as c from "../controller/sessionCongtroller.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/",auth,c.getSessions);
router.delete("/:id",auth,c.deleteSession);

export default router;
