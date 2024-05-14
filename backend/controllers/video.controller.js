const { ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { S3Client  } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Controller function to fetch all videos from S3 bucket
const getAllVideosFromS3 = async (req, res) => {
    try {
        // Parameters for listing objects in the S3 bucket
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
        };

        // Call ListObjectsV2Command to list objects in the bucket
        const command = new ListObjectsV2Command(params);
        const response = await s3Client.send(command);

        // Extract the list of objects from the response
        const objects = response.Contents;

        // Generate signed URLs for each object and return them
        const videoUrls = [];
        for (const object of objects) {
            const getObjectParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: object.Key,
            };
            const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), { expiresIn: 3600 }); // Set expiry time as needed
            videoUrls.push(signedUrl);
        }

        // Return the list of video URLs as the API response
        res.json({ videos: videoUrls });
    } catch (error) {
        console.error('Error fetching videos from S3:', error);
        res.status(500).json({ error: 'Failed to fetch videos from S3' });
    }
};

module.exports = {
    getAllVideosFromS3,
};
