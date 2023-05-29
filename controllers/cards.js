const Card = require('../models/card');
const { STATUS_CODES } = require('../utils/errors');

// Получаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// Создаем карточку по id
module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CODES.CREATED_STATUS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Неверный запрос при создании карточки',
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
    });
};

// Ставим лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(STATUS_CODES.OK_STATUS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .send({ message: 'Неверный запрос' });
      } else {
        res
          .status(STATUS_CODES.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Удаляем карточку
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(STATUS_CODES.OK_STATUS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .send({ message: 'Неверный запрос' });
      } else {
        res
          .status(STATUS_CODES.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// Убираем лайк у карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(STATUS_CODES.OK_STATUS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .send({ message: 'Неверный запрос' });
      } else {
        res
          .status(STATUS_CODES.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
