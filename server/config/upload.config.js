const multer  = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../assets/images'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({storage: storage });

module.exports = upload;