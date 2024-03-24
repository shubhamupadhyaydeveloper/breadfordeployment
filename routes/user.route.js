const express = require("express")
const {signupUser , loginUser ,getUserProfile ,getUserData, logoutUser , followUnfollowUser , upadateUserprofile , getFeed, recommendedUser} = require('../controllers/user.controler')
const {storage} = require('../utils/storage')
const multer = require('multer')
const upload = multer({storage})
const router = express.Router()
const protectedRoute = require('../middleware/protect.route')

router.get('/getuserdata/:username',protectedRoute,getUserData)
router.get("/profile/:query",protectedRoute,getUserProfile)
router.get("/recommended",protectedRoute , recommendedUser)
router.get('/feed',protectedRoute ,getFeed)
router.post('/signup' , signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id' , protectedRoute, followUnfollowUser)
router.put('/update/:id' , upload.single("profilePic") , protectedRoute , upadateUserprofile)


module.exports = router;