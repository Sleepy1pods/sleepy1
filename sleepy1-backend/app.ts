import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRoute from './modules/auth/auth.route.js';
import bookingRoute from './modules/booking/booking.route.js';
import newsletterRoute from './modules/newsletter/newsletter.route.js';
import chatbotRoute from './modules/chatbot/chatbot.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://sleepy1pods.com',
            'https://www.sleepy1pods.com',
            ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [])
        ].map(url => url.trim().replace(/\/$/, '')); // Remove trailing slash if present

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sleepy1 backend is running 🚀"
  });
});

app.use('/api/auth', authRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/chatbot', chatbotRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
