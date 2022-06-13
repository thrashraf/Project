import multer from 'multer';
import path from 'path';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3-v2';
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKeys = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKeys,
  region,
});

const storage = multerS3({
  s3: s3,
  bucket: bucketName,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = path.parse(file.originalname);
    cb(null, fileName.name.split(' ').join('_') + Date.now() + fileName.ext);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

export const upload = multer({ storage: storage });
