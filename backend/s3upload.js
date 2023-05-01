const { config } = require("dotenv")
const fs = require("fs")
config()

const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const sessionToken = process.env.AWS_SESSION_TOKEN

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken
})
function uploadFile(file){
    const fileStream = fs.createReadStream(file)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file
    }
    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile