const express=require("express");
const post=require("../models/posts");
const router =express.Router();

const {sendPost}=require("../controllers/posts")    

router.post('/create',sendPost);

router.get('/all', async (req, res) => {
    try {
        const posts = await post.find().populate('user','username'); // Fetch posts from the database
        res.json(posts); // Send posts as JSON
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports=router