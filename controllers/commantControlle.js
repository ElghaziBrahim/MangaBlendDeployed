const commentModule = require("../modules/commentModule")
const jwt = require("jsonwebtoken")
const postModule = require("../modules/postModule")

async function addComment(req, res) {
    const token = req.body.token
    const comment = req.body.comment
    const postId = req.body.postId
    jwt.verify(token, 'mySecretKey', async (err, user) => {
        if (err) {
            return res.json({ access: false });
        } else {

            const newComment = new commentModule({
                post_id: postId,
                user_id: user.id,
                username: user.username,
                content: comment
            })
            newComment.save()
            const updatedPost = await postModule.findByIdAndUpdate(
                postId,
                { $inc: { comments: 1 } },
                { new: true }
            );

            if (updatedPost) {
                console.log('Post updated successfully:', updatedPost);
            } else {
                console.log('No post found with the provided ID.');
            }

            res.json({ message: "added done" })
        }
    })
}



module.exports = { addComment }