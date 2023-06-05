const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

const {
  userIdValidate,
  userInfoValidate,
  userAvatarValidate,
} = require('../middlewares/validation');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/:userId', userIdValidate, getUserById); // возвращает пользователя по _id
router.get('/users/me', getCurrentUser); // возвращает информацию о текущем пользователе
router.patch('/users/me/avatar', userAvatarValidate, updateAvatar); // обновляет аватар
router.patch('/users/me', userInfoValidate, updateProfile); // обновляет профиль

module.exports = router;
