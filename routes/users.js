const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.get('/', getUsers); // возвращает всех пользователей
router.get('/:userId', getUserById); // возвращает пользователя по _id
router.get('/', getCurrentUser); // создаёт пользователя
router.patch('/me/avatar', updateAvatar); // обновляет аватар
router.patch('/me', updateProfile); // обновляет профиль

module.exports = router;
