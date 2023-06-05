const router = require('express').Router();
const {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  cardValidate, cardIdValidate,
} = require('../middlewares/validation');

router.get('/cards', getCards); // возвращает все карточки
router.post('/cards/', cardValidate, createCard); // создаёт карточку
router.delete('/cards/:cardId', cardIdValidate, deleteCard); // удаляет карточку по идентификатору
router.put('/cards/:cardId/likes', cardIdValidate, likeCard); // поставить лайк карточке
router.delete('/cards/:cardId/likes', cardIdValidate, dislikeCard); // убрать лайк с карточки

module.exports = router;
