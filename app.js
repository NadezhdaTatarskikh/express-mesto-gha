const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { signinValidade, signupValidate } = require('./middlewares/validation');
const NotFound = require('./utils/errors/NotFound');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

// подключаем парсеры
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', signinValidade, login);
app.post('/signup', signupValidate, createUser);

// подключаем роутинг
app.use('/users', auth, userRouter);
app.use('/card', auth, cardRouter);

// Обработка запроса на несуществующий роут
app.all('*/', (req, res, next) => {
  next(new NotFound('Страница не существует'));
});

// обработчик ошибок celebrate
app.use(errors());

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
