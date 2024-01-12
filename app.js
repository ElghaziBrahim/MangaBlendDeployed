const express = require("express")
const mongoose = require("mongoose")
const userController = require("./controllers/userController")
const cors = require("cors")
const bodyParser = require("body-parser")
const postRoute = require("./routes/postRoute")
const commentRoute = require("./routes/commentRoute")
const communityRoute = require("./routes/communityRoute")
const userRoute = require("./routes/userRoute")

const path = require('path');


const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://belghazi1305:ms3yZzRw2G74g4@brahimel.p0bcih2.mongodb.net/MangaBlend?retryWrites=true&w=majority')

/* app.use(express.static("./public")) */

app.use(express.static(path.join(__dirname, 'dist')));

app.use("/post", postRoute)
app.use("/comment", commentRoute)
app.use("/community", communityRoute)
app.use("/user", userRoute)


app.get("/logout", userController.logOutUser)
app.get("/isuserauth", userController.IsUserLogged)
app.post("/signup", userController.addUser)
app.post("/login", userController.authUser)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log("Server running on port 3000"))
