// deleteItem.js
import AWS_S3 from 'aws-sdk/clients/s3.js';

export default async function deleteItem(req, res) {
  try {
    const s3 = new AWS_S3({ signatureVersion: 'v4' });

    const { key } = req.body;
    const Bucket = process.env.S3_BUCKET_NAME;

    await s3.headObject({ Bucket, Key: key }).promise();

    await s3.deleteObject({ Bucket, Key: key }).promise();

    if(req.file) return res.status(200).json({ response: req.file });

    return res.status(200).json({ response: "Object Deleted" });
  } catch (error) {
    return res.status(500).json({error});
  }
}