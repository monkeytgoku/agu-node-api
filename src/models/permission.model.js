'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
	permission_key: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	permission_name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
  status: {
    type: String,
    enum: ['active', 'deactive'],
    default: 'active'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: String
  }
});

module.exports = mongoose.model('Permission', PermissionSchema);