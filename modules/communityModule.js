const mongoose = require("mongoose")

const community = mongoose.model("community", new mongoose.Schema({
    name: String,
    description: String,
    logo: String,
    slug: String,
    members: Number,
    createdAt: { type: Date, default: new Date() }
}))

module.exports = community