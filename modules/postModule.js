const mongoose = require("mongoose")

const post = mongoose.model("post", new mongoose.Schema({
    title: String,
    content: String,
    user_id: String,
    username: String,
    comments: { type: Number, default: 0 },
    timePosted: { type: Date, default: new Date() },
    communitySlug  : String
}))

module.exports = post