const Card = require('../models/card');
const { ERROR_CODE } = require('../utils/errors');

// Получаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
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
      res.status(ERROR_CODE.CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({
          message: 'Неверный запрос при создании карточки',
        });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({
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
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_CODE.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: 'Неверный запрос' });
      } else {
        res
          .status(ERROR_CODE.SERVER_ERROR)
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
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_CODE.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: 'Неверный запрос' });
      } else {
        res
          .status(ERROR_CODE.SERVER_ERROR)
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
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(ERROR_CODE.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: 'Неверный запрос' });
      } else {
        res
          .status(ERROR_CODE.SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
