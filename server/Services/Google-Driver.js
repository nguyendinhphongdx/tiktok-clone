const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { FOLDER_IDS_UPLOAD } = require('../Config/Constant');

const GoogleDriver = (function () {
    let instance;

    function createInstance() {
        const credentials = path.join(process.cwd() + '/Config/credentials.json');
        const auth = new google.auth.GoogleAuth({
            keyFile: credentials, // Đường dẫn đến tệp tin JSON chứa thông tin xác thực
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.file',
            ],
        });

        return google.drive({ version: 'v3', auth });
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const driver = google.drive({
//     version: 'v3',
//     auth: oauth2Client
// })

const that = {
    /**
     * 
     * @param {Object} video 
     * @param {String} video.id
     * @param {String} video.name
     * 
     */
    downloadVideo: (video) => {
        return new Promise(async (resolve, reject) => {
            const fileId = video.id; // ID của tệp tin bạn muốn tải xuống
            const filePath = path.join(process.cwd(), 'temp', video.name); // Đường dẫn để lưu tệp tin tải xuống
            if (fs.existsSync(filePath)) {
                const file = fs.statSync(filePath);
                console.log(`File ${video.name} downloaded successfully`);
                return resolve({
                    ...video,
                    size: file.size,
                    filePath,
                });
            }
            const driver = GoogleDriver.getInstance();
            try {
                const response = await driver.files.get(
                    { fileId, alt: 'media' },
                    { responseType: 'stream' }
                );

                const dest = fs.createWriteStream(filePath);
                response.data
                    .on('end', () => {
                        console.log(`File ${video.name} downloaded successfully`);
                        const file = fs.statSync(filePath);
                        resolve({
                            ...video,
                            size: file.size,
                            filePath,
                        });
                    })
                    .on('error', (err) => {
                        console.error('Error downloading file:', err);
                        reject(err);
                    })
                    .pipe(dest);
            } catch (error) {
                console.error('Error retrieving file:', error);
                reject(error);
            }
        })
    },
    setFilePublic: async (fileId) => {
        try {
            const driver = GoogleDriver.getInstance();
            await driver.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                },
                supportsAllDrives: true,
            })

            const getUrl = await driver.files.get({
                fileId,
                fields: 'webViewLink, webContentLink'
            })

            return getUrl;
        } catch (error) {
            console.error(error);
        }
    },
    /**
     * 
     * @param {Object} params
     * @param {String} params.fileName string name of the file to upload driver
     * @param {String[]} params.folderIds folderids to upload
     * @param {String} params.pathLocal pathFile original to upload driver
     * @param {'video/mp4' | 'application/javascript' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/xml' | 'application/zip' | 'application/zip' | 'multipart/form-data' | 'image/png' | 'image/jpeg' | 'image/gif' } params.mimeType string 
    * 
    * @returns {Promise<{webContentLink: String, webViewLink: String}>}
    */
    uploadFile: async (params) => {
        const { fileName, folderIds, mimeType, pathLocal } = params;
        try {
            const driver = GoogleDriver.getInstance();
            if (!fs.existsSync(pathLocal)) throw new Error('Không tìm thấy file ' + pathLocal);
            const createFile = await driver.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: mimeType,
                    parents: folderIds,
                },
                media: {
                    mimeType: mimeType,
                    body: fs.createReadStream(pathLocal)
                },
                supportsAllDrives: true,
            })
            const fileId = createFile.data.id;
            console.log(createFile.data)
            console.log(`https://drive.google.com/file/d/${fileId}/view?usp=drive_link`);
            return {
                webViewLink: `https://drive.google.com/file/d/${fileId}/view?usp=drive_link`
            };
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    deleteFile: async (fileId) => {
        try {
            const driver = GoogleDriver.getInstance();
            console.log('Delete File:::', fileId);
            const deleteFile = await driver.files.delete({
                fileId: fileId,
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            })
            console.log(deleteFile.data, deleteFile.status)
        } catch (error) {
            console.error(error);
        }
    },
    getVideoLinks: async (folderLink) => {
        let folderId = folderLink.split('/')[folderLink.split('/').length - 1]; // ID của thư mục bạn muốn lấy các video từ đó
        folderId = folderId.split('?')[0];
        const pageSize = 100; // Số lượng tệp tin lấy được
        const ids = [];
        try {
            const driver = GoogleDriver.getInstance();
            const response = await driver.files.list({
                q: `'${folderId}' in parents`,
                pageSize,
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            });

            const files = response.data.files;
            if (files && files.length > 0) {
                files.forEach(file => {
                    console.log(`${file.name}: ${file.id}`);
                    ids.push(file.id);
                });
            } else {
                console.log('No files found.');
            }
            console.log(ids);
            return ids;
        } catch (error) {
            console.error('Error retrieving video links:', error);
        }
    },
    getInfoVideo: async (videoId) => {
        try {
            const driver = GoogleDriver.getInstance();
            const response = await driver.files.get({
                fileId: videoId,
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
                mimeType: 'text/plain',
                fields: 'size,modifiedTime,id,name'
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error retrieving video links:', error);
        }
    }
}

module.exports = that;
that.uploadFile({
    fileName: 'Test-Upload.mp4',
    mimeType: 'video/mp4',
    folderIds: FOLDER_IDS_UPLOAD,
    pathLocal: process.cwd() + '/public/video/2605023438542206099.mp4'
});

// that.downloadVideo({
//     id: '1e5vPrlY-tX4zStidPW-NhCLkMjoovNye',
//     name: 'Clone-5S4E2VFVDRM23XXB.mp4'
// })

// that.deleteFile('1dnjgthzy1z64w3ctiOISE_98_oNmr4pN')
// that.getVideoLinks('https://drive.google.com/drive/folders/1aFYS91XgDvG6N5tXF6ehN-AoO-agrAKW');
// that.getInfoVideo('1U-k0CxGKEvL5qrkNR4P2w_ws2WMX_zfK')
