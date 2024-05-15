const {  Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
const busboy = require('busboy');
const { v4: uuidv4 } = require('uuid');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Function to upload video to S3 using Upload API
const uploadToS3 = async (fileStream, fileName) => {
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: fileStream,
            ContentType: 'video/mp4',
        },
    });
    const result = await upload.done();
    return result.Location;
};

// Controller function to handle video upload
const uploadVideo = (req, res) => {
    const bb =  busboy({ headers: req.headers });
    let fileStream;

    // Listen for file field
    bb.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        // Create a writable stream to store the file data
        fileStream = file;

        // Generate a unique filename
        const fileName = uuidv4(); 

        try {
            // Upload the file to S3
            const fileUrl = await uploadToS3(fileStream, fileName);

            // Return the S3 URL as response
            res.json({ fileUrl });
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            res.status(500).json({ error: 'Failed to upload file to S3' });
        }
    });

    // Pipe the request stream to busboy to start parsing
    req.pipe(bb);
};

module.exports = {
    uploadVideo,
};
