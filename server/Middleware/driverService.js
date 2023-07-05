const path = require('path');
const multer = require('multer');
const os = require('os');
const { FOLDER_IDS_UPLOAD } = require('../Config/Constant');
const that = require('../Services/Google-Driver');

const driverService = {
    uploadImage: async (req, res, next) => {
        if (req.file) {
            const filename = req.file.filename;
            const response = await that.uploadFile({
                fileName: filename,
                mimeType: 'image/jpeg',
                pathLocal: process.cwd() + '/public/images/' + filename,
                folderIds: FOLDER_IDS_UPLOAD,
                deleteOrigin: true
            });
            req.file.path = 'https://drive.google.com/uc?export=view&id=' + response.id;
            req.file.filename = response.urlImage;
        }
        next();
    },
    uploadVideo: async (req, res, next) => {
        if (req.file) {
            const filename = req.file.filename;
            const response = await that.uploadFile({
                fileName: filename,
                mimeType: 'video/mp4',
                pathLocal: process.cwd() + '/public/videos/' + filename,
                folderIds: FOLDER_IDS_UPLOAD,
                deleteOrigin: true
            });
            req.file.path = 'https://drive.google.com/uc?export=download&id=' + response.id;
            req.file.filename = filename;
        }
        next();
    },
    uploadFiles: async (req, res, next) => {
        if (req.files) {
            for (var index = 0; index < req.files.length; index++) {
                const file = req.files[index];
                const filename = file.filename;
                const response = await that.uploadFile({
                    fileName: filename,
                    mimeType: file.mimetype,
                    pathLocal: process.cwd() + '/public/assets/' + filename,
                    folderIds: FOLDER_IDS_UPLOAD,
                    deleteOrigin: true
                });
                req.files[index].path = 'https://drive.google.com/uc?export=view&id=' + response.id;
                req.files[index].filename = filename;
            }
        }
        next();
    },
};

module.exports = driverService;