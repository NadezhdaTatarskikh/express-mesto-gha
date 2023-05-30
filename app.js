const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const CardRouter = require('./routes/cards');
const { ERROR_CODE } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

// подключаем парсеры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6473d2507fac4b751843b7ed',
  };
  next();
});

// подключаем роутинг
app.use('/', userRouter);
app.use('/', CardRouter);

app.all('*/', (req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
