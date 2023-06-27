const path = require('path');
const multer = require('multer');
const os = require('os');
const { FOLDER_IDS_UPLOAD } = require('../Config/Constant');

const driverService = {
    uploadDriver: async (req, res, next) => {
        if(req.file){
            const filename = req.file.filename;
            const response =  await that.uploadFile({
                fileName: filename,
                mimeType: 'image/jpeg',
                pathLocal: process.cwd() + '/public/assets/uploads/' + filename,
                folderIds: FOLDER_IDS_UPLOAD,
                deleteOrigin: true
            });
            req.file.path = response.webViewLink;
            req.file.filename = response.urlImage;
        }
        next();
    }
};

module.exports = driverService;