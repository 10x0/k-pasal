const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name of the user.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email address.'],
    unique: true,
    validate: [validator.isEmail, 'Please provide valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password.'],
    minLength: [8, 'Password must be 8 characters or long.'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'customer',
    enum: ['admin', 'customer'],
  },
  passwordResetToken: String,
  passwordResetTokenExpiresIn: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.pre('findByIdAndUpdate', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
