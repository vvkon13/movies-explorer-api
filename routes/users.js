const router = require('express').Router();
const {
  celebrate,
} = require('celebrate');

const {
  getUsers,
  getUserMe,
  patchUser,
} = require('../controllers/users');
const { USER_VALIDATION_OBJECT_NOT_REQUIRED } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.patch('/me', celebrate(USER_VALIDATION_OBJECT_NOT_REQUIRED), patchUser);

module.exports = router;
