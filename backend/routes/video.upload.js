const express = require('express')
const videoUploadController = require('../controllers/video.uploadController')
const checkAuthMiddleware = require('../middleware/check-auth')
const router = express.Router()

router.post('/upload',checkAuthMiddleware.checkAuth,videoUploadController.uploadVideo)


module.exports = router