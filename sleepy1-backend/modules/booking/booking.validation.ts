import { z } from "zod";

export const createBookingSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.email(),
        phone: z.string(),
        checkInDate: z.string(),
        checkInTime: z.string(),
        checkOutDate: z.string(),
        checkOutTime: z.string(),
        gender: z.string(),
    })
});
