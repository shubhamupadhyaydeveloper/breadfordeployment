const express =  require('express')
const protectedRoute = require("../middleware/protect.route")
const {storage} = require('../utils/storage')
const multer = require('multer')
const upload = multer({storage})
const router = express.Router()
const {createPost , getPost  ,postDetail, deletePost ,likePost , replyToPost , getFeed} = require("../controllers/post.controllers")

router.get('/:username/post/:postId',protectedRoute,postDetail)
router.get('/:id', getPost )
router.get('/feed' ,  protectedRoute , getFeed)
router.post('/create' , upload.single("img") ,  protectedRoute, createPost)
router.delete('/:id', protectedRoute , deletePost)
router.put('/like/:id',protectedRoute ,likePost )
router.put('/reply/:id', protectedRoute , replyToPost)


module.exports = router;