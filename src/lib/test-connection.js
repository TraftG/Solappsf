const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Тестовое подключение успешно!');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при тестовом подключении:', error);
    process.exit(1);
  }
}

testConnection(); 