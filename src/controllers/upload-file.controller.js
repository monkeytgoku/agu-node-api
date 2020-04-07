const uploadService = require('../services/upload.service');

const uploadFileController = {};

uploadFileController.uploadImage = async function (req, res) {
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
