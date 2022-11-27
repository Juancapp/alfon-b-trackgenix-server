const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  role: { type: String, required: true, enum: ['ADMIN', 'SUPER_ADMIN', 'EMPLOYEE'] },
});

module.exports = mongoose.model('Users', UsersSchema);
