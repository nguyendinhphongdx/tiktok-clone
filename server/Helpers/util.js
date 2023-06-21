var fs = require('fs');
var dir = './tmp/but/then/nested';

/**
 * 
 * @param {String} dir 
 */
function createFolder(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}
module.exports =  {
    createFolder
}