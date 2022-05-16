// Bring in amazon s3 for photo uploading
const AWS = require('aws-sdk');
// Bring in sharp to compress images
const sharp = require('sharp');
const crypto = require('crypto');

const config = require('../config');

AWS.config.update({ accessKeyId: config?.awsKey, secretAccessKey: config?.awsSecret, region: config?.awsReg });

const s3 = new AWS.S3();

const media = {
    create: async (req, res) => {
        // photo upload
        try {
            const body = req.body;
            const buf = new Buffer(body?.imageBody?.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const data = await sharp(buf).resize(750, null).rotate().toBuffer();
            const params = {
                Bucket: config?.awsBucket,
                Key: `${crypto.randomBytes(20).toString('hex')}.${body?.imageExtension}`,
                Body: data,
                ContentType: `image/${body?.imageExtension}`,
                ACL: 'public-read'
            }
            s3.config.endpoint = 's3-accelerate.amazonaws.com';
            s3.upload(params, async (errors, uploadResponse) => {
                if (errors) {
                    return res.status(500).send('s3 upload failed');
                } else {
                    console.log(uploadResponse?.Location);
                    return res.status(200).json('success');
                }
            });
        } catch (e) {
            return res.status(500).send('s3 upload failed');
        }
    }
}

module.exports = media;
