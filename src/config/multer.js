// multer.js

import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import crypto from 'crypto';

export default {
  storage: multerS3({
		// Instance of S3
    s3: new AWS.S3(),

		// Bucket Name
    bucket: "treinamento-s3",

    // Specifies how the file will be stored
    contentType: multerS3.AUTO_CONTENT_TYPE,

    // Controls your API access to this document
    acl: 'public-read',

    // Specifies the key that your file will have on S3
    key: (req, file, cb) => {
			// provide 8 randombits on hash
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      })
    }
  }),

  // Limits of parameters of files that can be send to your API
  limits: {
		// Size of files (1024*1024 == 1MB)
    fileSize: 1024*1024*2, // 2MB
  },

	// Set any other filters that you like for the files that will be send
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      //.png
      'image/png',
    ];

    if(allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Invalid type of file - (${file.mimetype})`));
  },
};