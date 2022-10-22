const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRoute = require('./routes/cardsRoute');
const usersRoute = require('./routes/usersRoute');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт

const app = express();

// роуты, не требующие авторизации
app.post('/signin', createUser);
app.post('/signup', login);
// авторизация
app.use(auth);

app.use(bodyParser.json());
app.use('/', cardsRoute);
app.use('/', usersRoute);

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use('*', (_, res) => {
  res.status(404).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
