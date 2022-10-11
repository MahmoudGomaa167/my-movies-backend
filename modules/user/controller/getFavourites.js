const { paginate } = require('../../../common/paginate');
const userModel = require('../../../DB/models/User');

const getFavourites = async (req, res) => {
    try {
        let { pageNumber, size } = req.query
        const user = await userModel.findOne({ _id: req.user._id })
        const { skip, limit, page } = paginate(pageNumber, size)

        if (user) {
            const userFavourites = await userModel.findOne({ _id: req.user._id }, { favourites: { $slice: [skip, limit] } }).populate({
                path: 'favourites',
                select: 'title poster_image'
            }).select('-password -code')

            const favouritesLength = await userModel.aggregate([
                {
                    $project: {
                        numOfFavourites: { $size: "$favourites" }

                    }
                }
            ])

            const numOfFavourites = favouritesLength.find(item => item._id.toString() === user._id.toString()).numOfFavourites

            res.status(200).json({ currentPage: Number(page), numOfPages: Math.ceil(numOfFavourites / limit), favourites: userFavourites.favourites })
        } else {
            res.status(400).json({ message: "invalid user" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = getFavourites