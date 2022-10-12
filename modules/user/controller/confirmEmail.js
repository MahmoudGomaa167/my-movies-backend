const userModel = require('../../../DB/models/User')

const confirmEmail = async (req, res) => {
    try {
        const { userId } = req.params
        const { verificationKey } = req.body

        const user = await userModel.findOne({ _id: userId })

        if (user) {
            if (verificationKey === user.code) {
                const updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { is_verified: true, code: null }, { new: true })
                res.status(200).json({ message: 'Email Confirmed Successfully' })
            } else {
                res.status(400).json({ message: 'invalid verification key' })
            }
        } else {
            res.status(400).json({ message: 'invalid user' })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = confirmEmail