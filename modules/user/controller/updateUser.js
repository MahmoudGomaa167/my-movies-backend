const userModel = require('../../../DB/models/User')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../../common/sendEmail')


const updateUser = async (req, res) => {
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
                const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { userName, email, gender, phone, profile_pic: imageUrl, is_verified: false }, { new: true }).select('-password -code')
                const emailToken = jwt.sign({ _id: req.user._id }, process.env.SECRET_KEY)
                const message = `
                <h2>Please click the link to verify your email</h2>
                <a href="${req.protocol}://${req.headers.host}/verifyEmail/${emailToken}">Click Me</a>`
                await sendEmail(email, message)
                res.status(200).json({ message: 'User updated successfully please verify your new email', user: updatedUser })
            }
        } else {
            const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { userName, email, gender, phone, profile_pic: imageUrl }, { new: true }).select('-password -code')
            res.status(200).json({ message: 'User updated successfully', user: updatedUser })
        }
    }
    else {
        res.status(400).json({ message: 'invalid user' })
    }


}

module.exports = updateUser