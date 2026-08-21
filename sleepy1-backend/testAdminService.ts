import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authService from './modules/auth/auth.service.js';
import adminService from './modules/admin/admin.service.js';

dotenv.config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to DB.');

    const stats = await adminService.getDashboardStats();
    console.log('Dashboard stats:', stats);

    const bookings = await adminService.getAllBookings();
    console.log('Bookings count:', bookings.length);

    const users = await adminService.getAllUsers();
    console.log('Users count:', users.length);

    console.log('Admin backend services test PASSED ✅');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
};

test();
