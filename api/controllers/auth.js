const crypto = require('crypto');
const { User } = require('../models');
const ErrorHandler = require('../handlers/error');
const PromiseHandler = require('../handlers/promise');
const { sendToken } = require('../handlers/jwt');

exports.register = PromiseHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'sample_id',
      url: 'sample_url',
    },
  });

  const user = await User.findOne({ email }).select('+password');

  sendToken(user, 201, res);
});

exports.login = PromiseHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given both
  if (!email || !password) {
    return next(
      new ErrorHandler('Please provide both email and password.', 400)
    );
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new ErrorHandler('Invalid email or password.', 401));
  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return next(new ErrorHandler('Invalid email or password.'), 401);
  }

  sendToken(user, 200, res);
});

exports.forgotPassword = PromiseHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found.', 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/ums/resetPassword/${resetToken}`;

  const message = `Reset your password at :- \n\n ${resetURL} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendMail({
      email: user.email,
      subject: 'Reset your password - (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Password reset mail sent successfully.',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = PromiseHandler(async (req, res, next) => {
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken,
    passwordResetTokenExpiresIn: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler('Reset token is not valid or expired.', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password didn't match.", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;

  await user.save();
  sendToken(user, 200, res);
});

exports.check = PromiseHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  res.status(200).json({ success: true, user });
});
