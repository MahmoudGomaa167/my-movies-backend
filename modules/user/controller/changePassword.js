const userModel = require('../../../DB/models/User');
const bcrypt = require('bcrypt')

const changePassword = async (req, res) => {
    try {
        const { newPassword, cNewPassword } = req.body

        const user = await userModel.findOne({ _id: req.user._id })

        if (user) {
            if (newPassword === cNewPassword) {
                const password = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS))
                const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { password, code: null }, { new: true })
                res.status(200).json({ message: "password changed successfully" })
            } else {
                res.status(400).json({ message: "passwords don't match" })
            }
        } else {
            res.status(400).json({ message: "invalid user" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = changePassword