const Post = require("../models/posts");
const User = require("../models/users");
const path=require("path")

async function sendPost(req, res) {
    try {
        const { description } = req.body;
        
        
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized: Please log in first" });
        }
        let existingUser;
        try {
            existingUser = await User.findById(userId);
        } catch (error) {
            return res.status(500).json({ msg: "Error finding user", error });
        }

        if (!existingUser) {
            return res.status(400).json({ msg: "Unable to find user by ID" });
        }

        const newPost = await Post.create({
            description,
            user: existingUser._id,
            createdAt: Date.now(),
            
        });

        existingUser.posts.push(newPost._id);
        await existingUser.save();
     
  res.sendFile(path.resolve(__dirname, '../views/home.html'));
 //       res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong", error });
    }
}



module.exports = {
    sendPost,
};
