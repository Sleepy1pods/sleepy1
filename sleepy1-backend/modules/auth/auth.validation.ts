import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string().regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
        email: z.email("Invalid email format"),
        phone: z.string(),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })
})

export const loginSchema = z.object({
    body: z.object({
        email: z.email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })
})