const userModel = require('../../../DB/models/User')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../../common/sendEmail')
const crypto = require('crypto')

const register = async (req, res) => {
    try {
        const { userName, email, password, cPassword, gender } = req.body

        if (password === cPassword) {
            const userEmail = await userModel.findOne({ email })

            if (!userEmail) {
                let imageUrl;
                if (gender === 'male') {
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/male.png`
                } else {
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/female.png`
                }
                const code = crypto.randomBytes(10).toString('hex')
                const user = new userModel({ userName, email, password, profile_pic: imageUrl, gender, code })
                const savedUser = await user.save()
                const userToken = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY)
                const message = `
            <h2>Email Verification Key</h2>
            <p>${code}</p>`
                const subject = 'Email Confirmation'
                await sendEmail(savedUser.email, message, subject)
                res.status(201).json({ message: "Registered successfully", userToken })
            } else {
                res.status(400).json({ message: "email already registered" })
            }

        } else {
            res.status(400).json({ message: "confirm password must match password" })
        }

    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = register
