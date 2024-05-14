const express = require('express')
const videoController = require('../controllers/video.controller')
// const checkAuthMiddleware = require('../middleware/check-auth')
const router = express.Router()

router.get('/',videoController.getAllVideosFromS3)

module.exports= router