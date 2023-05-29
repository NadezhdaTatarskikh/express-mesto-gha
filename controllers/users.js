const userModel = require('../models/user');
const { STATUS_CODES } = require('../utils/errors');

// Получаем всех пользователей
module.exports.getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// Создаем нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel
    .create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED_STATUS).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Неверный запрос при создании пользователя',
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Получаем пользователя по id
module.exports.getUserById = (req, res) => {
  userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.OK_STATUS).send({ data: user });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь пс таким _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Неверный запрос поиска' });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Обновляем данные пользователя
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  return userModel
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.OK_STATUS).send(user);
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Неверный запрос при обновлении профиля',
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Обновляем аватар пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  return userModel
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.OK_STATUS).send(user);
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Неверный запрос при обновлении аватара',
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
