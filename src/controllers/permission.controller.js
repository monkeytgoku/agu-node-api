'use strict';
const Permission = require('../models/permission.model');

const permissionController = {};
const fields = '_id permission_key permission_name status created_date created_by updated_date updated_by';

permissionController.getPermissions = function (req, res) {
	Permission.find({}, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json(result);
	});
};

permissionController.createPermission = function (req, res) {
	const permission = new Permission(req.body);
	permission.save((err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Create permission successfully' });
	});
};

permissionController.getPermissionById = function (req, res) {
	Permission.findById(req.params.permissionId, fields, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json(result);
	});
};

permissionController.updatePermission = function (req, res) {
	// { new: true } an option that asks mongoose to return the updated version of the document instead of the pre-updated one
	Permission.findOneAndUpdate({ _id: req.params.permissionId }, { ...req.body }, { new: true }, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Update permission successfully' });
	});
};

permissionController.deletePermission = function (req, res) {
	Permission.remove({
		_id: req.params.permissionId
	}, function (err, result) {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.status(200).json({ message: 'Delete permission successfully' });
	});
};

module.exports = permissionController;