const userModel = require('../../../DB/models/User');

const resetPassword = async (req, res) => {
    try {
        const { verificationKey } = req.body

        const user = await userModel.findOne({ _id: req.user._id })

        if (user) {
            if (verificationKey === user.code) {
                res.status(200).json({ message: "Done" })
            } else {
                res.status(400).json({ message: "invalid verification key" })
            }
        } else {
            res.status(400).json({ message: "invalid user" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }


}

module.exports = resetPassword