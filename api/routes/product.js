const express = require('express');
const {
  all,
  create,
  update,
  remove,
  getSingle,
} = require('../controllers/product');

const { authenticated, authorized } = require('../middlewares/auth');

const router = express.Router();

// ROUTE :- BASE/api/product
router.route('/all').get(all);
router.route('/').post(authenticated, authorized('admin'), create);
router
  .route('/:id')
  .get(getSingle)
  .put(authenticated, authorized('admin'), update)
  .delete(authenticated, authorized('admin'), remove);

module.exports = router;
