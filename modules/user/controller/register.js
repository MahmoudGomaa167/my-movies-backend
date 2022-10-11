const userModel = require('../../../DB/models/User')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../../common/sendEmail')

const register = async (req, res) => {
    try {
        const { userName, email, password, cPassword, gender } = req.body

        if (password === cPassword) {
            const userEmail = await userModel.findOne({ email })

            if (!userEmail) {
                let imageUrl;
                if(gender === 'male'){
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/male.png`
                }else{
                    imageUrl = `${req.protocol}://${req.headers.host}/profileImages/female.png`
                }
                const user = new userModel({ userName, email, password, profile_pic: imageUrl, gender })
                const savedUser = await user.save()
                const userToken = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY)
                const emailToken = jwt.sign({ _id: savedUser._id, email: savedUser.email }, process.env.SECRET_KEY)
                const message = `
            <h2>Please click the link to verify your email</h2>
            <a href="${req.protocol}://${req.headers.host}/verifyEmail/${emailToken}">Click Me</a>`
                await sendEmail(savedUser.email, message)
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
