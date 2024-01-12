const route = require("express").Router()
const postController = require("../controllers/postController")
const jwt = require("jsonwebtoken")


route.get("/", postController.getAllPosts)
route.post("/new", postController.createPost)
route.get("/byid/:id", postController.getPostById)
route.get("/byco/:co", postController.getPostsByCo)
route.get("/search/:key", postController.getPostsBySearch)



module.exports = route