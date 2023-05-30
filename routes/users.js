const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/:userId', getUserById); // возвращает пользователя по _id
router.post('/users', createUser); // создаёт пользователя
router.patch('/users/me/avatar', updateAvatar); // обновляет аватар
router.patch('/users/me', updateProfile); // обновляет профиль

module.exports = router;
