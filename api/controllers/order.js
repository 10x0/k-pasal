const { Order } = require('../models');
const ErrorHandler = require('../handlers/error');
const PromiseHandler = require('../handlers/promise');
const QueryHandler = require('../handlers/query');
const axios = require('axios');

// @desc Get all Orders
// @method GET
// @route api/Order/all
// @access PUBLIC
exports.all = PromiseHandler(async (req, res, next) => {
  const resultsPerPage = req.perPage || 100;
  const queryHandler = new QueryHandler(Order.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const allOrders = await queryHandler.query.sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    allOrders,
  });
});

// @desc Create new Order
// @method POST
// @route api/Order/
// @access ADMIN
exports.create = PromiseHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  let { token, ...data } = req.body;

  let payload = {
    token,
    amount: 1000,
  };

  let config = {
    headers: { Authorization: `Key ${process.env.KHALTI_API_SECRET_KEY}` },
  };

  let khaltiResponse = await axios.post(
    process.env.KHALTI_API_ENDPOINT,
    payload,
    config
  );

  await Order.create({
    ...data,
    name: khaltiResponse.data.user.name,
  });

  res.status(201).json({
    success: true,
    Order,
  });
});

// @desc Get single Order
// @method GET
// @route api/Order/:id
// @access PUBLIC
exports.getSingle = PromiseHandler(async (req, res, next) => {
  const singleOrder = await Order.findById(req.params.id);
  if (!singleOrder) {
    return next(new ErrorHandler('Order not found.', 404));
  }

  res.status(200).json({
    success: true,
    singleOrder,
  });
});

// @desc Update Order
// @method PUT
// @route api/Order/:id
// @access ADMIN
exports.update = PromiseHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found.', 404));
  }

  await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// @desc Delete Order
// @method DELETE
// @route api/Order/:id
// @access ADMIN
exports.remove = PromiseHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found.', 404));
  }

  await Order.remove();

  res.status(200).json({
    success: true,
    message: 'Order removed successfully.',
  });
});
