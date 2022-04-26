const express = require('express');
const { authenticated, authorized } = require('../middlewares/auth');
const {
  getAll,
  getSingle,
  create,
  update,
  remove,
  changePassword,
} = require('../controllers/user');

// ROUTE :- BASE/api/user
const router = express.Router();

router.route('/all').get(authenticated, authorized('admin'), getAll);
router
  .route('/changePassword')
  .put(authenticated, authorized('admin'), changePassword);

router.route('/').post(authenticated, authorized('admin'), create);
router
  .route('/:id')
  .get(authenticated, getSingle)
  .put(authenticated, authorized('admin'), update)
  .delete(authenticated, authorized('admin'), remove);

module.exports = router;
