const route = require("express").Router()
const communityController = require("../controllers/communityController")

route.get("/slug/:slug", communityController.getCommunityBySlug)
route.get("/search/:key", communityController.getCommunitiesBySearch)



module.exports = route