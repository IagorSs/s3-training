// find.js
import AWS_S3 from 'aws-sdk/clients/s3.js';

export default async function find(req, res) {
  try {
    const s3 = new AWS_S3({ signatureVersion: 'v4' });

    const { key } = req.body;
    const Bucket = process.env.S3_BUCKET_NAME;

		// Just to catch errors as wrong key, the method below
		// this doesn't detect them
    await s3.headObject({ Bucket, Key: key }).promise();

    const storageFile = s3.getSignedUrl('getObject', {
      Bucket,
      Key: key,
    });

    return res.status(200).json({ response: storageFile });
  } catch (error) {
    return res.status(500).json({error});
  }
}