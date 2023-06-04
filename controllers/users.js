const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR_CODE } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFound = require('../utils/errors/NotFound');
const ConflictError = require('../utils/errors/ConflictError');

// Получаем всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hast(password, 10)
    .then((hast) => User.create({
      name,
      about,
      avatar,
      email,
      password: hast,
    }))
    .then(() => res.status(ERROR_CODE.CREATED).send({
      name,
      about,
      avatar,
      email,
    }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.code === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с такой почтой уже существует'),
        );
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      // вернём токен
      res.send({ _id: token });
    })
    .catch(next);
};

// Создаем нового пользователя
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// Получаем пользователя по id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      return next(err);
    });
};

// Обновляем данные пользователя
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Введены некорректные данные при обновлении профиля',
          ),
        );
      }
      return next(err);
    });
};

// Обновляем аватар пользователя
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Введены некорректные данные при обновлении аватара',
          ),
        );
      }
      return next(err);
    });
};
