const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRoute = require('./routes/cardsRoute');
const usersRoute = require('./routes/usersRoute');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт

const app = express();

app.use((req, _, next) => {
  req.user = {
    _id: '634c3815c9c0b79fd45dd6dc',
  };

  next();
});

app.use(bodyParser.json());
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
