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
router.get('/:userId', getUserById, userIdValidate); // возвращает пользователя по _id
router.get('/', getCurrentUser); // создаёт пользователя
router.patch('/me/avatar', updateAvatar, userAvatarValidate); // обновляет аватар
router.patch('/me', updateProfile, userInfoValidate); // обновляет профиль

module.exports = router;
