import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRoute from './modules/auth/auth.route.js';
import bookingRoute from './modules/booking/booking.route.js';

dotenv.config();

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

app.use('/api/auth', authRoute);
app.use('/api/bookings', bookingRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
