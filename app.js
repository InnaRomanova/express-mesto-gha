const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.get('/', (req, res) => {
  res.send('get reguest');
});

app.post('/', (req, res) => {
  res.send('post reguest');
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
