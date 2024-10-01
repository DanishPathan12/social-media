const user = require("../models/users");
const bcrypt = require("bcryptjs");
const path=require("path")


async function handleUserSignUp(req, res) {
    const { name, username, gender, age, password } = req.body;
    const saltRound = 10;
    console.log(password)
   // if(!password){return res.status(400).send("password is required")}
    const hashedpw = await bcrypt.hash(password, saltRound);
    try {
        await user.create({
            name,
            username,
            gender,
            age,
            password: hashedpw,
            posts: []
        });
        res.sendFile(path.resolve(__dirname, '../views/home.html'));
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function handleUserLogin(req, res) {
    const { username, password } = req.body;
    const User = await user.findOne({ username });

    if (!User) {
        return res.status(404).send("No user found");
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);
    if (isPasswordValid) {
        // Store the user ID in the session
        req.session.userId = User._id;
        res.sendFile(path.resolve(__dirname, '../views/home.html'));
    } else {
        res.status(401).send("Invalid password");
    }
}


module.exports = {
    handleUserSignUp,
    handleUserLogin
}
