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
router.post('/', createCard, cardValidate); // создаёт карточку
router.delete('/:cardId', deleteCard, cardIdValidate); // удаляет карточку по идентификатору
router.put('/:cardId/likes', likeCard, cardIdValidate); // поставить лайк карточке
router.delete('/:cardId/likes', dislikeCard, cardIdValidate); // убрать лайк с карточки

module.exports = router;
