import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authModel from './modules/auth/auth.model.js';
import bookingModel from './modules/booking/booking.model.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Create a demo customer if none exists
    let customer = await authModel.findOne({ email: 'john.doe@example.com' });
    if (!customer) {
      customer = await authModel.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        password: 'password123',
        role: 'user'
      });
      console.log('Created customer user: John Doe');
    }

    let customer2 = await authModel.findOne({ email: 'sarah.connor@example.com' });
    if (!customer2) {
      customer2 = await authModel.create({
        name: 'Sarah Connor',
        email: 'sarah.connor@example.com',
        phone: '+91 91234 56789',
        password: 'password123',
        role: 'user'
      });
      console.log('Created customer user: Sarah Connor');
    }

    // Check existing bookings count
    const existingBookings = await bookingModel.countDocuments();
    if (existingBookings === 0) {
      await bookingModel.insertMany([
        {
          userId: customer._id,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 98765 43210',
          checkInDate: '2026-08-25',
          checkInTime: '14:00',
          checkOutDate: '2026-08-25',
          checkOutTime: '18:00',
          gender: 'Male'
        },
        {
          userId: customer2._id,
          name: 'Sarah Connor',
          email: 'sarah.connor@example.com',
          phone: '+91 91234 56789',
          checkInDate: '2026-08-26',
          checkInTime: '10:00',
          checkOutDate: '2026-08-26',
          checkOutTime: '12:00',
          gender: 'Female'
        },
        {
          userId: customer._id,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 98765 43210',
          checkInDate: '2026-08-28',
          checkInTime: '09:00',
          checkOutDate: '2026-08-28',
          checkOutTime: '15:00',
          gender: 'Male'
        }
      ]);
      console.log('Created 3 sample bookings');
    }

    const totalUsers = await authModel.countDocuments();
    const totalBookings = await bookingModel.countDocuments();
    console.log(`Total users in DB: ${totalUsers}`);
    console.log(`Total bookings in DB: ${totalBookings}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
