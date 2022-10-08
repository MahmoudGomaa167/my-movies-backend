const userModel = require('../../../DB/models/User');
const crypto = require('crypto');
const sendEmail = require('../../../common/sendEmail');
const jwt = require('jsonwebtoken')

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email })

        if (user) {
            const code = crypto.randomBytes(20).toString('base64')
            const updatedUser = await userModel.findOneAndUpdate({ email }, { code }, { new: true })
            const token = jwt.sign({ _id: updatedUser._id }, process.env.SECRET_KEY)
            const message = `
        <h1>Reset Password Code</h1>
        <p>${code}</p>`
            sendEmail(email, message)
            res.status(200).json({ message: "code sent successfully", token })
        } else {
            res.status(400).json({ message: "invalid email" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = forgetPassword