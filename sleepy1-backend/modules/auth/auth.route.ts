import { Router } from "express";
import authController from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { protect } from "../../middlewares/protect.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/logout", authController.logout);

router.get("/me", protect, authController.getMe);

export default router;