import { Router } from "express";
import * as c from "../controller/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/",auth,c.getUsers);
router.get("/:id",auth,c.getUser);
router.patch("/:id",auth,c.updateUser);
router.delete("/:id",auth,c.deleteUser);


router.patch("/block/:id",auth,c.block);
router.patch("/unblock/:id",auth,c.unblock);



router.get("/search/:q",auth,c.search);
router.get("/active/all",auth,c.activeUsers);
router.get("/inactive/all",auth,c.inactiveUsers);
router.get("/stats/all",auth,c.stats);
router.get("/recent/all",auth,c.recent);
router.patch("/role/change",auth,c.changeRole);
router.post("/avatar",auth,c.uploadAvatar);
router.delete("/avatar/remove",auth,c.removeAvatar);


export default router;
