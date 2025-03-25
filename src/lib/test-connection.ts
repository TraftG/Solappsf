import connectDB from './mongodb';

async function testConnection() {
  try {
    await connectDB();
    console.log('Тестовое подключение успешно!');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при тестовом подключении:', error);
    process.exit(1);
  }
}

testConnection(); 