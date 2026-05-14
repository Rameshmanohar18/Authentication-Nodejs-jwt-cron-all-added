import { Router } from "express";
import * as c from "../controller/profileController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/",auth,c.create);
router.get("/",auth,c.get);
router.put("/",auth,c.update);
router.delete("/",auth,c.delete);

export default router;
