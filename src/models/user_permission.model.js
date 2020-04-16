'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPermissionSchema = new Schema({
	user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  permission_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

module.exports = mongoose.model('UserPermission', UserPermissionSchema);