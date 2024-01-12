const mongoose = require("mongoose")

const comment = mongoose.model("comment", new mongoose.Schema({
    post_id: String,
    user_id: String,
    username: String,
    content: String
}))

module.exports = comment