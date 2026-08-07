import { Router } from "express";
import bookingController from "./booking.controller.js";
import { validate } from "../../middlewares/validate.js";
import { protect } from "../../middlewares/protect.js";
import { createBookingSchema } from "./booking.validation.js";

const router = Router();

router.post("/", protect, validate(createBookingSchema), bookingController.createBooking);
router.get("/", protect, bookingController.getBookings);

export default router;
