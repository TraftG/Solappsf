const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Разрешить все CORS-запросы
app.use(cors());

// Маршрут для получения цены токена
app.get('/api/price', async (req, res) => {
  const { tokenId } = req.query;
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении цены' });
  }
});

// Запуск сервера
app.listen(3000, () => console.log('Сервер запущен на порту 3000'));