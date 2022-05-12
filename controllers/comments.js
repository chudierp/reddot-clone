const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {
// CREATE Comment
    app.post('/posts/:postId/comments', (req, res) => {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
        comment.author = req.user._id;
    
        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
            .save()
            .then(() => Post.findById(req.params.postId))
            .then((post) => {
                post.comments.unshift(comment);
                post.save();
            })
            // REDIRECT TO THE ROOT
            .then(() => res.redirect(`/posts/${req.params.postId}`))
            .catch((err) => {
                console.log(err);
            });
    });
};