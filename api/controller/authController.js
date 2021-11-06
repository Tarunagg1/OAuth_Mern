const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');


const loginUser = async (req, res) => {
    let email = req.body.formData.email;
    let password = req.body.formData.password;
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "user not exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id,name:existingUser.name  }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ token, result: existingUser });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


const regiserUser = async (req, res) => {
    const { email, password, name, lastname, repeatpass } = req.body.formData;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "user allready exists" });
        else if (password !== repeatpass)
            return res.status(400).json({ message: "Incorrect password" });
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({ name, lastname, email, password: hashPassword });
        const token = jwt.sign({ email: result.email, id: result._id,name:result.name }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ token, result: result });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    loginUser,
    regiserUser
}

