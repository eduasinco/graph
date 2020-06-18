const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profile_image") {
            cb(null, './uploads/profile_images/')
        } else if (file.fieldname === "background_image") {
            cb(null, './uploads/background_images/');
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === "profile_image") {
            cb(null, file.fieldname + Date.now() + file.originalname);
        } else if (file.fieldname === "background_image") {
            cb(null, file.fieldname + Date.now() + file.originalname);
        }
    }
});
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 10
    // },
    // fileFilter: (req, file, cb) => {
    //     checkFileType(file, cb);
    // }
}).fields(
    [
        {name: 'profile_image', maxCount: 1},
        {name: 'background_image', maxCount: 1},
    ]
);

function checkFileType(file, cb) {
    if (file.fieldname === "certificate") {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) { // check file type to be pdf, doc, or docx
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    } else if (file.fieldname === "natid" || file.fieldname === "profile") {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            fiel.mimetype === 'image/gif'
        ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    }
}

module.exports = upload