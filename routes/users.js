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

router.get('/', getUsers); // возвращает всех пользователей
router.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе
router.get('/:userId', userIdValidate, getUserById); // возвращает пользователя по _id
router.patch('/me/avatar', userAvatarValidate, updateAvatar); // обновляет аватар
router.patch('/me', userInfoValidate, updateProfile); // обновляет профиль

module.exports = router;
