const postModule = require("../modules/postModule")
const jwt = require("jsonwebtoken")
const commentModule = require("../modules/commentModule")

const getAllPosts = async (req, res) => {
    const posts = await postModule.find()
    res.json(posts)
}
function createPost(req, res) {
    const token = req.body.token
    const post = req.body.post
    jwt.verify(token, 'mySecretKey', async (err, user) => {
        if (err) {
            return res.json({ access: false });
        } else {
            const new_post = new postModule({
                title: post.title,
                content: post.content,
                user_id: user.id,
                username: user.username,
                communitySlug: post.community
            })
            new_post.save()
            res.json({ message: "added done", post: new_post })
        }
    })

}
async function getPostById(req, res) {
    const id = req.params.id;

    const post = await postModule.findOne({ _id: id }).exec();
    const comments = await commentModule.find({ post_id: id }).exec();

    res.send({ post: post, comments: comments })
}

async function getPostsByCo(req, res) {
    const comSlug = req.params.co;
    const posts = await postModule.find({ communitySlug: comSlug }).exec();

    res.send(posts)
}


async function getPostsBySearch(req, res) {
    const searchKey = req.params.key;
    try {
        console.log(searchKey)

        if (searchKey == 'all') {
            const posts = await postModule.find();
            res.send(posts);
        } else {
            const posts = await postModule.find({
                $or: [
                    { title: { $regex: searchKey, $options: 'i' } }, // Case-insensitive name search
                    { content: { $regex: searchKey, $options: 'i' } } // Case-insensitive description search
                ]
            });
            res.send(posts);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { getAllPosts, createPost, getPostById, getPostsByCo, getPostsBySearch }