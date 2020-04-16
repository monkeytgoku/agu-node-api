'use strict';
const Role = require('../models/role.model');
const RolePermission = require('../models/role_permission.model');

const roleController = {};
const fields = '_id role_name status created_date created_by updated_date updated_by';

roleController.getRoles = function (req, res) {
	Role.find({}, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json(result);
	});
};

roleController.createRole = function (req, res) {
	const role = new Role(req.body);
	role.save((err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Create role successfully' });
	});
};

roleController.getRoleById = function (req, res) {
	Role.findById(req.params.roleId, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json(result);
	});
};

roleController.updateRole = function (req, res) {
	// { new: true } an option that asks mongoose to return the updated version of the document instead of the pre-updated one
	Role.findOneAndUpdate({ _id: req.params.roleId }, { ...req.body }, { new: true }, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Update role successfully' });
	});
};

roleController.deleteRole = function (req, res) {
	Role.remove({
		_id: req.params.roleId
	}, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Delete role successfully' });
	});
};

/*
 * <<<<<<<<<<<<<<<<<<<<<<<<< Role - Permission >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

roleController.grantPermission = function (req, res) {
	const rolePermission = new RolePermission(req.body);
	rolePermission.save((err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Grant permission to role successfully' });
	});
};

roleController.getRolePermission = function (req, res) {
	const fields = '_id role_id permission_id';
	RolePermission.findById(req.params.roleId, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json(result);
	});
};

roleController.updateRolePermission = function (req, res) {
	RolePermission.findOneAndUpdate({ _id: req.params.rolePermissionId }, { ...req.body }, { new: true }, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Update role - permission successfully' });
	});
};

roleController.deleteRolePermission = function (req, res) {
	RolePermission.remove({
		_id: req.params.rolePermissionId
	}, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Delete role - permission successfully' });
	});
};

module.exports = roleController;