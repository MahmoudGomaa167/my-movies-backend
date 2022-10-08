const userModel = require('../../../DB/models/User');

const getUserById = async(req, res) => {
    const {userId} = req.params

    const user = await userModel.findOne({_id: userId}).select('-password -code').populate({
        path: 'favourites',
        select: 'title poster_image'
    })

    if(user){
        res.status(200).json({message: "Done", user})
    }else{
        res.status(400).json({message: "invalid user"})
    }
}

module.exports = getUserById