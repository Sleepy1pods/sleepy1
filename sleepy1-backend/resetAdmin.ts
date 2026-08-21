import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import authModel from './modules/auth/auth.model.js';

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Remove any existing admin@sleepy1.com
    await authModel.deleteOne({ email: 'admin@sleepy1.com' });

    // Create fresh admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new authModel({
      name: 'Super Admin',
      email: 'admin@sleepy1.com',
      phone: '9999999999',
      password: hashedPassword,
      role: 'admin'
    });

    // Save directly without triggering pre-save hook re-hashing
    await authModel.collection.insertOne({
      name: 'Super Admin',
      email: 'admin@sleepy1.com',
      phone: '9999999999',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Admin account recreated with password: admin123');
    
    // Verify password compare works
    const check = await authModel.findOne({ email: 'admin@sleepy1.com' });
    const isMatch = await check?.comparePassword('admin123');
    console.log('Password verification check:', isMatch ? 'PASSED ✅' : 'FAILED ❌');

    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin();
