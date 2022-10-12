const userModel = require('../../../DB/models/User')
const crypto = require('crypto')
const sendEmail = require('../../../common/sendEmail')


const resendKey = async(req, res) => {
    try {
        const {userId} = req.params

    const user = await userModel.findOne({_id: userId})

    if(user){
        const code = crypto.randomBytes(10).toString('hex')
        const message = `
        <h2>Email Verification Key</h2>
        <p>${code}</p>`
        const subject = "Verification Code"
        sendEmail(user.email, message, subject)
        const updatedUser = await userModel.findOneAndUpdate({_id: userId}, {code}, {new: true})
        res.status(200).json({message: "Code sent successfully"})
    }else{
        res.status(400).json({message: "invalid user"})
    }
    } catch (error) {
       res.status(500).json({message: 'internal server error'}) 
    }
    
}

module.exports = resendKey

