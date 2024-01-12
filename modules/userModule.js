const mongoose = require("mongoose")


const user = mongoose.model("User", new mongoose.Schema({
    email: String,
    username: String,
    password: String
}
))

module.exports = user