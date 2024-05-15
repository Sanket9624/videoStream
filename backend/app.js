const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json());

const userRoute = require('./routes/user')
const videoUploadRoute = require('./routes/video.upload')
const video = require('./routes/video')

app.use('/user',userRoute)
app.use('/video',videoUploadRoute)
app.use('/videos',video)


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Port is running on http://localhost:${port}`);
})