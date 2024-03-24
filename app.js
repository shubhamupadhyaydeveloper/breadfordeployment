require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cookieparser =  require('cookie-parser')
const mongodb = require('./utils/mongoose.connect')
const port = process.env.PORT || 5000
const userRouter = require('./routes/user.route')
const postRouter = require('./routes/post.route')
const cloudinary = require('cloudinary').v2

// connect mongodb
mongodb()

console.log(__dirname)

// setmiddleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieparser())


//routes
app.use('/api/user', userRouter)
app.use('/api/post' , postRouter)

//deployment
app.use(express.static(path.join(__dirname,'/client/dist')));

//render client for any path
app.get("*" , (req,res) => res.sendFile(path.join(__dirname,'/client/dist/index.html')))

app.listen(port , () => {
    console.log(`App is live on port ${port}`)
})

cloudinary.config({
   cloud_name : process.env.CLOUD_NAME,
   api_key : process.env.CLOUD_KEY,
   api_secret : process.env.CLOUD_SECRET
})

app.get('/' , (req ,res) => {
    res.send('Hi and welcome to my website')
})
 
