import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const baseUri = 'mongodb+srv://sleepy1pods_db_user:rQco9ACw4u3xxBrT@cluster0.izocbqu.mongodb.net/';

const resetAdmin = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    for (const dbName of ['test', 'sleepy1']) {
      const conn = await mongoose.createConnection(`${baseUri}${dbName}?retryWrites=true&w=majority`).asPromise();
      
      await conn.collection('users').updateOne(
        { email: 'admin@sleepy1.com' },
        {
          $set: {
            name: 'Super Admin',
            email: 'admin@sleepy1.com',
            phone: '9999999999',
            password: hashedPassword,
            role: 'admin',
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        { upsert: true }
      );

      await conn.collection('users').updateOne(
        { email: 'admin@test.com' },
        {
          $set: {
            name: 'Admin Test',
            email: 'admin@test.com',
            phone: '9999999999',
            password: hashedPassword,
            role: 'admin',
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        { upsert: true }
      );

      console.log(`✅ Admin account updated in '${dbName}' database.`);
      await conn.close();
    }

    console.log('All databases synced with admin password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin();

