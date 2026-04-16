const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE / DISLIKE A POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// SHARE A POST
router.put("/:id/share", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
  
    await post.updateOne({ $inc: { shares: 1 } });
    res.status(200).json("Post has been shared!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return res.status(404).json("User not found");

    const userPosts = await Post.find({ userId: currentUser._id });
    
    const followingList = currentUser.followings || [];

    const friendPosts = await Promise.all(
      followingList.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
