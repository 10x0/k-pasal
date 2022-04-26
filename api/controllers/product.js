const { Product } = require('../models');
const ErrorHandler = require('../handlers/error');
const PromiseHandler = require('../handlers/promise');
const QueryHandler = require('../handlers/query');
const cloudinary = require('cloudinary').v2;

// @desc Get all products
// @method GET
// @route api/product/all
// @access PUBLIC
exports.all = PromiseHandler(async (req, res, next) => {
  const resultsPerPage = req.perPage || 100;
  const queryHandler = new QueryHandler(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const allProducts = await queryHandler.query.sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    allProducts,
  });
});

// @desc Create new product
// @method POST
// @route api/product/
// @access ADMIN
exports.create = PromiseHandler(async (req, res, next) => {
  const cloud = await cloudinary.uploader.upload(req.body.image, {
    folder: 'products',
    overwrite: true,
    invalidate: true,
    width: 400,
    crop: 'scale',
  });

  req.body.user = req.user.id;
  let data = {
    ...req.body,
    image: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  };

  let product = await Product.create(data);

  res.status(201).json({
    success: true,
    product,
  });
});

// @desc Get single product
// @method GET
// @route api/product/:id
// @access PUBLIC
exports.getSingle = PromiseHandler(async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);
  if (!singleProduct) {
    return next(new ErrorHandler('Product not found.', 404));
  }

  res.status(200).json({
    success: true,
    singleProduct,
  });
});

// @desc Update product
// @method PUT
// @route api/product/:id
// @access ADMIN
exports.update = PromiseHandler(async (req, res, next) => {
  const cloud = await cloudinary.uploader.upload(req.body.image, {
    folder: 'products',
    overwrite: true,
    invalidate: true,
    width: 400,
    crop: 'scale',
  });
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found.', 404));
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image: {
        public_id: cloud.public_id,
        url: cloud.secure_url,
      },
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

// @desc Delete product
// @method DELETE
// @route api/product/:id
// @access ADMIN
exports.remove = PromiseHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found.', 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product removed successfully.',
  });
});
