const route = require("express").Router()
const commentController = require("../controllers/commantControlle")

route.post("/new", commentController.addComment)


module.exports = route