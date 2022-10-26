const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routers = require('./routes/index');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(routers);
app.use(errors());

mongoose.connect('mongodb://127.0.0.1/mestodb');

// app.use('*', (_, res) => {
//   res.status(404).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
// });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
