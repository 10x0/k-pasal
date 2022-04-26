const { User } = require('../models');
const ErrorHandler = require('../handlers/error');
const asyncHandler = require('../handlers/promise');
const { sendToken } = require('../handlers/jwt');
const bcrypt = require('bcryptjs/dist/bcrypt');

exports.create = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  await User.create({
    name,
    role,
    email,
    password,
    avatar: {
      public_id: 'sample_id',
      url: 'sample_url',
    },
  });

  res.status(200).json({
    success: true,
  });
});

exports.getAll = asyncHandler(async (req, res) => {
  const self = req.user._id;
  const users = await User.find({ _id: { $ne: self } });

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingle = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found.', 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.update = asyncHandler(async (req, res) => {
  const { name, email, role, password } = req.body;

  await User.findById(req.params.id, function (err, doc) {
    doc.name = name;
    doc.email = email;
    doc.role = role;
    doc.password = password;
    doc.save();
  }).clone();

  res.status(200).json({
    success: true,
  });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not found.', 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const passwordMatched = await user.comparePassword(req.body.oldPassword);

  if (!passwordMatched) {
    return next(new ErrorHandler('Old password is incorrect.', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match.", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
