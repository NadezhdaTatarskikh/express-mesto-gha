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

router.get('/', getCards); // возвращает все карточки
router.post('/', cardValidate, createCard); // создаёт карточку
router.delete('/:cardId', cardIdValidate, deleteCard); // удаляет карточку по идентификатору
router.put('/:cardId/likes', cardIdValidate, likeCard); // поставить лайк карточке
router.delete('/:cardId/likes', cardIdValidate, dislikeCard); // убрать лайк с карточки

module.exports = router;
