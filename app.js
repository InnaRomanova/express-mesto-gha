const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cardsRoute');
const usersPouter = require('./routes/usersRoute');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, _, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

app.use('/cards', cardsRouter);
app.use('/users', usersPouter);
app.use('*', (_, res) => {
  res.status().send({ message: 'Ресурс не найден.' });
});

// app.get('/', (req, res) => {
//   res.send('get reguest');
// });

// app.post('/', (req, res) => {
//   res.send('post reguest');
// });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
