import type { Request, Response } from "express";
import bookingService from "./booking.service.js";

class BookingController {
    createBooking = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body, userId: req.user._id };
            const booking = await bookingService.createBooking(data);
            res.status(201).json({
                success: true,
                message: "Booking created successfully",
                data: booking
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    getBookings = async (req: Request, res: Response) => {
        try {
            const bookings = await bookingService.getBookings(req.user._id);
            res.status(200).json({
                success: true,
                message: "Bookings fetched successfully",
                data: bookings
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new BookingController();
