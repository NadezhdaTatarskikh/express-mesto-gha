const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { signinValidate, signupValidate } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
