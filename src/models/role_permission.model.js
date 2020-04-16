'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolePermissionSchema = new Schema({
  role_id: {
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

module.exports = mongoose.model('RolePermission', RolePermissionSchema);