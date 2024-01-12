const route = require("express").Router()

const userController = require("../controllers/userController")


route.get("/search/:key", userController.getUsersBySearch)



module.exports = route