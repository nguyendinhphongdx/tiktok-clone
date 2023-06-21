const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const userRoute = require('./Router/UserRoute')
const authRoute = require('./Router/AuthRoute')
const accountRoute = require('./Router/AccountRoute')
const trendyRoute = require('./Router/TagRoute')
const musicRoute = require('./Router/MusicRoute')
const videoRoute = require('./Router/VideoRoute')
const commentRoute = require('./Router/CommentRoute')
const reportRoute = require('./Router/ReportRoute')
const connectDB = require('./Services/ConnectDBService');
const { createFolder } = require('./Helpers/util');
const { PATH_VIDEO, PATH_IMAGES } = require('./Config/Constant');

require('dotenv').config()
//middleware apply cor add all request
app.use(cors())
app.use(morgan('dev'))
//middleware get info from client by req.body
app.use(express.json());
app.use('/public/images', express.static('public/images'))
app.use('/public/video', express.static('public/video'))
app.use('/public/music', express.static('public/music'))

//create folder if not exists
createFolder(PATH_VIDEO);
createFolder(PATH_IMAGES);


//connect database
connectDB()

//middleware router
app.use('/api/auth', authRoute)
app.use('/api/accounts', accountRoute)
app.use('/api/users', userRoute)
app.use('/api/trendy', trendyRoute)
app.use('/api/music', musicRoute)
app.use('/api/video', videoRoute)
app.use('/api/comment', commentRoute)
app.use('/api', reportRoute)
//

//
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
})