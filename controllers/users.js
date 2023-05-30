const User = require('../models/user');
const { ERROR_CODE } = require('../utils/errors');

// Получаем всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// Создаем нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(ERROR_CODE.CREATED).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({
          message: 'Неверный запрос при создании пользователя',
        });
      } else {
        res
          .status(ERROR_CODE.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Получаем пользователя по id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: 'Неверный запрос поиска' });
      } else {
        res
          .status(ERROR_CODE.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Обновляем данные пользователя
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.status(ERROR_CODE.OK).send(user);
      } else {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({
          message: 'Неверный запрос при обновлении профиля',
        });
      } else {
        res
          .status(ERROR_CODE.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Обновляем аватар пользователя
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.status(ERROR_CODE.OK).send(user);
      } else {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({
          message: 'Неверный запрос при обновлении аватара',
        });
      } else {
        res
          .status(ERROR_CODE.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
