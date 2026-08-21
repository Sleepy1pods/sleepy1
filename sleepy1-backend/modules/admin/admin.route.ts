import { Router } from "express";
import { protect } from "../../middlewares/protect.js";
import { restrictToAdmin } from "../../middlewares/protect.js";
import adminController from "./admin.controller.js";

const router = Router();

router.use(protect, restrictToAdmin);

router.get("/dashboard", adminController.dashboard);
router.get("/bookings", adminController.bookings);
router.get("/users", adminController.users);
router.get("/locations", adminController.locations);

export default router;
