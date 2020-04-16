'use strict';
const User = require('../models/user.model');
const UserRole = require('../models/user_role.model');
const UserPermission = require('../models/user_permission.model');
const bcrypt = require('bcrypt');
const appConfig = require('../configs/app.config');

const userController = {};
const fields = '_id user_name email first_name last_name birthday gender marital_status address mobile avatar status created_date created_by updated_date updated_by';

userController.getUsers = function (req, res) {
	User.find({}, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		result.map(ele => ele.avatar = ele.avatar ? appConfig.baseUrl + ele.avatar : '');
		res.status(200).json(result);
	});
};

userController.resgisterUser = function (req, res) {
	bcrypt
		.hash(req.body.password, 10)
		.then(hash => {
			const user = new User(req.body);
			user.password = hash;
			user.save((err, result) => {
				if (err) {
					return res.status(500).json({ error: err });
				}
				res.status(200).json({ message: 'Register user successfully' });
			});
		})
		.catch(error => res.status(500).json({ error: error }));
};

userController.getUserById = function (req, res) {
	User.findById(req.params.userId, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		if (result && result.avatar) {
			result.avatar = appConfig.baseUrl + result.avatar;
		}
		res.status(200).json(result);
	});
};

userController.updateUser = function (req, res) {
	// { new: true } an option that asks mongoose to return the updated version of the document instead of the pre-updated one
	User.findOneAndUpdate({ _id: req.params.userId }, { ...req.body }, { new: true }, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Update user successfully' });
	});
};

userController.deleteUser = function (req, res) {
	User.remove({
		_id: req.params.userId
	}, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Delete user successfully' });
	});
};

/*
 * <<<<<<<<<<<<<<<<<<<<<<<<< User - Role >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

userController.grantRole = function (req, res) {
	const userRole = new UserRole(req.body);
	userRole.save((err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Grant role to user successfully' });
	});
};

userController.getUserRole = function (req, res) {
	const fields = '_id user_id role_id';
	UserRole.findById(req.params.userId, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json(result);
	});
};

userController.updateUserRole = function (req, res) {
	UserRole.findOneAndUpdate({ _id: req.params.userRoleId }, { ...req.body }, { new: true }, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Update user - role successfully' });
	});
};

userController.deleteUserRole = function (req, res) {
	UserRole.remove({
		_id: req.params.userRoleId
	}, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Delete user - role successfully' });
	});
};

/*
 * <<<<<<<<<<<<<<<<<<<<<<<<< User - Permission >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

userController.grantPermission = function (req, res) {
	const userPermission = new UserPermission(req.body);
	userPermission.save((err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Grant permission to user successfully' });
	});
};

userController.getUserPermission = function (req, res) {
	const fields = '_id user_id permission_id';
	UserPermission.findById(req.params.userId, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json(result);
	});
};

userController.updateUserPermission = function (req, res) {
	UserPermission.findOneAndUpdate({ _id: req.params.userPermissionId }, { ...req.body }, { new: true }, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Update user - permission successfully' });
	});
};

userController.deleteUserPermission = function (req, res) {
	UserPermission.remove({
		_id: req.params.userPermissionId
	}, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Delete user - permission successfully' });
	});
};

module.exports = userController;