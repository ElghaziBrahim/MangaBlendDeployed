const userModule = require("../modules/userModule")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const tokenBlacklist = [];




async function addUser(req, res, next) {
    req.data = { user: "userfound" }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.body.password == req.body.password2) {
        const user = new userModule({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
        user.save()
        res.json({ message: 'worked' })

    } else {
        res.json({ message: 'passwrd and confirmation password are not the same' })
    }
}
async function authUser(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const user = await userModule.findOne({ email })
    console.log({ user })
    if (!user) {
        return res.send({ type: false, message: 'User Not Found !!' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.send({ type: false, message: 'Invalid password !!' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, "mySecretKey", { expiresIn: "24h" })
    res.json({
        type: true, data: { username: user.username, gmail: user.email, accesToken: token }
    })
}
function IsUserLogged(req, res) {
    const Authorization = req.header('Authorization')
    if (!Authorization) {
        return res.send({ access: false });
    }

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'mySecretKey', async (err, user) => {
        if (err) {
            return res.json({ access: false });
        } else {
            if (token && tokenBlacklist.includes(token)) {
                return res.json({ access: false });
            }
            const userid = user.id
            const user_info = await userModule.findOne({ _id: userid });
            const user_infoSend = { username: user_info.username, email: user_info.email }
            return res.json({ access: true, data: user_infoSend });
        }


    })
}
function logOutUser(req, res) {
    const Authorization = req.header('Authorization')
    if (!Authorization) {
        return res.json({ access: false });
    }
    const token = req.header('Authorization').split(" ")[1]
    tokenBlacklist.push(token)
    return res.json({ access: true });
}

async function getUsersBySearch(req, res) {
    try {
        const searchKey = req.params.key
        if (searchKey == 'all') {
            const users = await userModule.find().select('-password');
            res.send(users);
        } else {
            const users = await userModule.find({
                $or: [
                    { username: { $regex: searchKey, $options: 'i' } }, // Case-insensitive name search
                    { email: { $regex: searchKey, $options: 'i' } } // Case-insensitive description search
                ]
            }).select('-password');
            res.send(users);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { addUser, authUser, IsUserLogged, logOutUser, getUsersBySearch }