import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';
import cloudinary  from "cloudinary";
import {multerUpload } from '../config/multer.js';

const cloudi = cloudinary.v2;

cloudi.config({ 
    cloud_name: "", 
    api_key: "", 
    api_secret: ""
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', multerUpload , (req, res) => {
  //res.send(`/${req.file.path}`);
  const path = req.file.path;


  if(req.file){

      try {

         
          cloudi.uploader.upload(path).then(result => {
              const image= result.secure_url;

          }).catch(err => {
             // return apiResponse.ErrorResponse(res,err);

          });
      } catch (error) {
          
      }
  }
});

// aws.config.update({
//   accessKeyId: config.accessKeyId,
//   secretAccessKey: config.secretAccessKey,
// });
// const s3 = new aws.S3();
// const storageS3 = multerS3({
//   s3,
//   bucket: 'amazona-bucket',
//   acl: 'public-read',
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const uploadS3 = multer({ storage: storageS3 });
router.post('/s3', uploadS3.single('image'), (req, res) => {
  res.send(req.file.location);
});
export default router;
