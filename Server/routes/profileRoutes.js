import { Router } from "express";
import * as c from "../controller/profileController.js";
import auth from "../middleware/authMiddleware.js";
import { mongoIdParam, validate } from "../middleware/validationMiddleware.js";

const router = Router();

router.patch("/skills", auth, c.skills);
router.patch("/location", auth, c.location);
router.patch("/socials", auth, c.socials);
router.post("/image", auth, c.uploadImage);
router.delete("/image", auth, c.deleteImage);
router.get("/:userId", auth, mongoIdParam("userId"), validate, c.getByUser);

router.post("/", auth, c.create);
router.get("/", auth, c.get);
router.put("/", auth, c.update);
router.delete("/", auth, c.remove);

export default router;
