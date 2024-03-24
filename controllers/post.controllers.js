const User = require('../models/user.model')
const Post = require("../models/post.model")
const cloudinary = require('cloudinary').v2

const createPost = async (req, res) => {
    const { postedBy, text} = req.body;
    let {img} = req.body;
    try {
        if (!postedBy || !text) return res.status(400).json({ message: "PostedBy and text are required to fill" })

        const user = await User.findById(postedBy)
        if (!user) return res.status(404).json({ message: "User not found" })

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorised to create post" })
        }

        if (text.length > 500) {
            return res.status(400).json({ message: 'text should not be greater than 500 words' })
        }

        if(img) {
            const uploadedFile = await cloudinary.uploader.upload(img)
            img = uploadedFile.secure_url;
        }

        const newPost = new Post({ postedBy, text, img })
        await newPost.save()

        res.status(201).json({ message: "Post created sucessfully" })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('Error in createpost', err)
    }
}

const getPost = async (req, res) => {
    const { id } = req.params;
    try {

        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        res.status(200).json(post)

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error in getPost", err.message)
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {

        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorised to delete post" })
        }

        if (post?.img) {
            await cloudinary.uploader.destroy(post.img.split("/").pop().split(".")[0]);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({message :"postDeleted successfully"})
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error in deletepost", err.message)
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id
    try {

        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        const isLiked = post.likes.includes(userId)
        if (isLiked) {
            // unlike
            await Post.findByIdAndUpdate(id, { $pull: { likes: userId } })
            res.status(200).json({ message: "Unliked is successful" })
        } else {
            //like
            post.likes.push(userId)
            await post.save()
            res.status(200).json({ message: "liked is successful" })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error in likePost", err.message)
    }
}

const replyToPost = async (req, res) => {
    const {text} = req.body
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    try {

        if (!text) return res.status(404).json({ message: "Text is required to fill" })

        const post = await Post.findById(postId)
        if (!post) return res.status(404).json({ message: "Post not found" })

        const reply = { userId, text, userProfilePic, username }
        post.replies.push(reply)
        await post.save();

        res.status(201).json(reply)

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error in reply to post", err.message)
    }
}

const getFeed = async (req ,res) => {
    const userId = req.user._id

    try {
        const user = await User.findById(userId)
        if(!user) return res.status(401).json({message : 'User is not found'})

        const following = user.following

        const result = await Post.find({postedBy : {$in : following}}).sort({createdAt : -1})

        res.status(200).json({result})
        
    } catch (err) {
        res.status(500).json({message :  err.message})
        console.log("Error in getFeed" , err.message)
    }

}

const postDetail = async (req,res) => {
    try {
       const {username,postId} = req.params;
       if(!username && !postId) return res.status(400).json({error:"Username or PostId is missing"})

       const userDetail = await User.find({username})
       const postDetail = await Post.findById(postId)

       if(!userDetail && !postDetail) return res.status(400).json({error : "UserDetail and PostDetail is not found"})
       return res.status(200).json({user:userDetail,post:postDetail})
    } catch (error) {
        res.status(500).json({message :  error.message})
        console.log("Error in postDetail" , error.message)
    }
}

module.exports = { createPost, getPost, deletePost, likePost, replyToPost, getFeed , postDetail}