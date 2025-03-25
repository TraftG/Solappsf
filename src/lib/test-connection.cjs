const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

async function testConnection() {
  try {
    await mongoose.connect('mongodb://localhost:27017/solappsf', {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    // Создаем тестовый документ, чтобы инициализировать базу данных
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.models.Test || mongoose.model('Test', testSchema);
    
    await Test.create({ name: 'test' });
    
    console.log('База данных solappsf успешно создана и инициализирована!');
    
    // Удаляем тестовый документ
    await Test.deleteMany({});
    
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при тестовом подключении:', error);
    process.exit(1);
  }
}

testConnection(); 