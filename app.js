const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { STATUS_CODES } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

// подключаем парсеры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем роутинг
app.use('/', userRouter);
app.use('/', cardRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '6473d2507fac4b751843b7ed',
  };
  next();
});

app.use('*/', (req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
