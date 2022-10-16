const express = require('express');
const mongoose = require('mongoose');
const cardsRoute = require('./routes/cardsRoute');
const usersRoute = require('./routes/usersRoute');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт

const app = express();

app.use(express.json());
app.use('/', cardsRoute);
app.use('/', usersRoute);

mongoose.connect('mongodb://127.0.0.1/mestodb');
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

app.use((req, res, next) => {
  req.user = {
    // вставьте сюда _id созданного в предыдущем пункте пользователя
    _id: '634c3815c9c0b79fd45dd6dc',
  };

  next();
});
