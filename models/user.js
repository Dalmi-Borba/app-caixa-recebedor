const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  mustChangePassword: { type: Boolean, default: true },
  passwordChangedAt: { type: Date }
}, { timestamps: true });

userSchema.methods.setPassword = async function (plain) {
  const saltRounds = 10;
  this.passwordHash = await bcrypt.hash(plain, saltRounds);
};

userSchema.methods.validatePassword = async function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
