const userModel = require('../../../DB/models/User')

const logout = async (req, res) => {

    const {userId} = req.params

    const user = await userModel.findOne({ _id: userId }).select('-password -code')

    if (user){
        const updatedUser = await userModel.findOneAndUpdate({_id: userId}, {isLogging: false}, {new: true})
        res.status(200).json({message: "Logout successfully"})
    }else{
        res.status(400).json({message: "invalid user"})
    }
}

module.exports = logout