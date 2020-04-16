const uploadService = require('../services/upload.service');

const uploadFileController = {};

uploadFileController.uploadImage = async function (req, res) {
	// let path = null;
	// if (req.body.newAvatar && req.body.newAvatar.file) {
	// 	const file = req.body.newAvatar.file.toString();
	// 	const fileType = req.body.newAvatar.fileType;
	// 	uploadService.uploadBase64(file, fileType).then(result => {
	// 		if (result.hasError) {
	// 			return res.status(500).json({ error: result.error });
	// 		} else {
	// 			path = result.path;
	// 		}
	// 	});
	// }
	if (req.body) {
		const file = req.body.file.toString();
		const fileType = req.body.fileType;
		const result = uploadService.uploadBase64(file, fileType);
		if (result.hasError) {
			return res.status(500).json({ error: err });
		}
	}
}

module.exports = uploadFileController;
