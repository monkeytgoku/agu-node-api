'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
	user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

module.exports = mongoose.model('UserRole', UserRoleSchema);