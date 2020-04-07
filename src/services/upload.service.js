const fs = require('fs');

const uploadService = {};

uploadService.uploadBase64 = (file, fileType) => {
    let result = null;
    const base64Data = file.substr(file.indexOf(',') + 1, file.length);
    path = `${process.env.ASSETS_IMAGES_PATH}/${Date.now()}.${fileType}`;
    fs.writeFile(path, base64Data, 'base64',  function(err) {
        result = err ? {hasError: true, error: err} : {hasError: false, path: path};
        console.log('1', result);
        
    });
    console.log('2', result);
    return result;
}

module.exports = uploadService;
