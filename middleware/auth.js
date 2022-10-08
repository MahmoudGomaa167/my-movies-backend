const jwt = require('jsonwebtoken')
const userModel = require('../DB/models/User')


const auth = (data) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization']

            if (!headerToken || headerToken === undefined || headerToken === null || !headerToken.startsWith('Bearer')) {
                res.status(400).json({ message: "invalid token" })
            } else {
                const token = headerToken.split(' ')[1]
                const decoded = jwt.verify(token, process.env.SECRET_KEY)
                const user = await userModel.findOne({ _id: decoded._id }).select('-password')

                if (!user) {
                    res.status(400).json({ message: "invalid token data" })
                } else {

                    if (data.includes(user.role)) {
                        req.user = user
                        next()
                    } else {
                        res.status(400).json({ message: "unauthorized" })
                    }

                }
            }
        } catch (error) {
            res.status(500).json({ message: "internal server error", error })
        }

    }
}

module.exports = auth;