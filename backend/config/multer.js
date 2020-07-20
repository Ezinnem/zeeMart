import multer from "multer";

var storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null,"./public/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + uniqueSuffix+"."+ext);
    }
});\

const multerUploads = multer({ storage }).single("image");
export { multerUploads };