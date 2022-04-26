const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  check,
} = require('../controllers/auth');
const { authenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/check').get(authenticated, check);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').put(resetPassword);

module.exports = router;
