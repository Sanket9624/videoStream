const express = require('express')
const videoUploadController = require('../controllers/video.uploadController')
const checkAuthMiddleware = require('../middleware/check-auth')
const router = express.Router()

router.post('/upload',videoUploadController.uploadVideo)


module.exports = router