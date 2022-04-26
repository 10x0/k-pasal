const express = require('express');
const { all, create, update } = require('../controllers/order');

const { authenticated, authorized } = require('../middlewares/auth');

const router = express.Router();

// ROUTE :- BASE/api/order
router.route('/all').get(authenticated, authorized('admin'), all);
router.route('/').post(authenticated, create);
router.route('/:id').put(authenticated, authorized('admin'), update);

module.exports = router;
