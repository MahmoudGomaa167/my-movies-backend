const userModel = require('../../../DB/models/User')
const sendEmail = require('../../../common/sendEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


const updateUser = async (req, res) => {
    try {
        const { userName, email, gender, phone, profile_pic } = req.body
        const user = await userModel.findOne({ _id: req.user._id })
        let imageUrl;
        if (!req.file) {
            if (profile_pic === '') {
                if (gender === 'male') {
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/male.png`
                } else {
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/female.png`
                }
            } else {
                if ((profile_pic.includes('male') || profile_pic.includes('female')) && gender === 'male') {
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/male.png`
                } else if ((profile_pic.includes('male') || profile_pic.includes('female')) && gender === 'female') {
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/female.png`
                } else {
                    imageUrl = profile_pic
                }
            }

        } else {
            imageUrl = `${req.protocol}://${req.headers.host}/${req.file.destination}/${req.file.filename}`
        }




        if (user) {
            if (email !== user.email) {
                const searchNewEmail = await userModel.findOne({ email })
                if (searchNewEmail) {
                    res.status(400).json({ message: "Email already exists" })
                } else {
                    const code = crypto.randomBytes(10).toString('hex')
                    const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { userName, email, gender, phone, profile_pic: imageUrl, is_verified: false, code }, { new: true }).select('-password -code')
                    const userToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
                    const message = `
                <h2>Email Verification Key</h2>
                <p>${code}</p>`
                    const subject = "Email Confirmation"
                    await sendEmail(email, message, subject)
                    res.status(200).json({ message: 'User updated successfully please verify your new email', user: updatedUser, userToken })
                }
            } else {
                const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { userName, email, gender, phone, profile_pic: imageUrl }, { new: true }).select('-password -code')
                res.status(200).json({ message: 'User updated successfully', user: updatedUser })
            }
        }
        else {
            res.status(400).json({ message: 'invalid user' })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }



}

module.exports = updateUser