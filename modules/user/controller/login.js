const userModel = require('../../../DB/models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email });

        if (user) {
            if (user.is_verified) {
                if (user.is_blocked) {
                    res.status(400).json({ message: "You've been blocked" })
                } else {
                    const match = await bcrypt.compare(password, user.password)
                    if (match) {
                        const token = jwt.sign({ _id: user._id, isLogging: true }, process.env.SECRET_KEY)
                        res.status(200).json({ message: "login success", token })
                    } else {
                        res.status(400).json({ message: "invalid email or password" })
                    }
                }
            } else {
                res.status(400).json({ message: "unverified email" })
            }
        } else {
            res.status(400).json({ message: "Email doesn't exist" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = login