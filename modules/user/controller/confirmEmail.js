const userModel = require('../../../DB/models/User')
const jwt = require('jsonwebtoken')

const confirmEmail = async (req, res) => {
    try {
        const { token } = req.params

        if (!token || token === null || token === undefined) {
            res.status(400).json({ message: "invalid token" })
        } else {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            const user = await userModel.findOne({ _id: decoded._id, email: decoded.email })
            if (user) {
                if (user.is_verified) {
                    res.status(400).json({ message: "email already confirmed" })
                } else {
                    const updatedUser = await userModel.findOneAndUpdate({ _id: decoded._id }, { is_verified: true }, { new: true })
                    res.status(200).json({ message: "Email confirmed successfully" })
                }
            } else {
                res.status(400).json({ message: "invalid link" })
            }

        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = confirmEmail