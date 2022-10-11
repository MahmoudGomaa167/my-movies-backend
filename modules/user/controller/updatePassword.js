const userModel = require('../../../DB/models/User')
const bcrypt = require('bcrypt')

const updatePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body

    const user = await userModel.findOne({_id: req.user.id})

    if(user){
        const oldNewMatch = await bcrypt.compare(oldPassword, user.password)
        if(oldNewMatch){
            if(oldPassword === newPassword){
                res.status(400).json({message: "Old password is the same as new password"})
            }else{
                const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS))
                const newUser = await userModel.findOneAndUpdate({_id: user._id}, {password: hashedPassword}, {new: true})
                res.status(200).json({message: "Password updated successfully"})
            }
        }else{
            res.status(400).json({message: "invalid password"})
        }

    }else{
        res.status(400).json({message: "invalid user"})
    }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }
    
}

module.exports = updatePassword