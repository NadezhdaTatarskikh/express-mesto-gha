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

router.get('/card', getCards); // возвращает все карточки
router.post('/card/', cardValidate, createCard); // создаёт карточку
router.delete('/card/:cardId', cardIdValidate, deleteCard); // удаляет карточку по идентификатору
router.put('/card/:cardId/likes', cardIdValidate, likeCard); // поставить лайк карточке
router.delete('/card/:cardId/likes', cardIdValidate, dislikeCard); // убрать лайк с карточки

module.exports = router;
