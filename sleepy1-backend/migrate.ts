import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authModel from './modules/auth/auth.model.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB.');

    const existing = await authModel.findOne({ email: 'admin@sleepy1.com' });
    if (existing) {
      existing.role = 'admin';
      await existing.save();
      console.log('admin@sleepy1.com already exists — role set to admin.');
    } else {
      await authModel.create({
        name: 'Super Admin',
        email: 'admin@sleepy1.com',
        phone: '9999999999',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Created admin@sleepy1.com with password: admin123');
    }
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
