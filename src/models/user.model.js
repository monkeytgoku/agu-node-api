'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const configs = require('../configs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  birthday: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  marital_status: {
    type: String
  },
  address: {
    type: String
  },
  mobile: {
    type: String
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'deactive'],
    default: 'active'
  },
  lang: {
    type: String
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
  },
  tokens: [{
      token: {
          type: String,
          required: true
      }
  }]
});

UserSchema.methods.generateToken = function() {
  const token = jwt.sign(
    {
      user: {
        _id: this._id,
        email: this.email,
        displayName: this.user_name,
        roles: this.roles
      }
    },
    configs.secret.SESSION_SECRET,
    {
      algorithm: "HS256",
      expiresIn: 86400
    }
  );
  this.tokens = this.tokens.concat({ token });
  return token;
}

UserSchema.methods.getInfoNoPassword = function() {
  return {
    _id: this._id,
    user_name: this.user_name,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    birthday: this.birthday,
    gender: this.gender,
    marital_status: this.marital_status,
    address: this.address,
    mobile: this.mobile,
    avatar: this.avatar,
    status: this.status,
    created_date: this.created_date,
    created_by: this.created_by,
    updated_date: this.updated_date,
    updated_by: this.updated_by,
    roles: this.roles
  }
}

module.exports = mongoose.model('User', UserSchema);