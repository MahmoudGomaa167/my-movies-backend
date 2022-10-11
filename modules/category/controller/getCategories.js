const categoryModel = require('../../../DB/models/Categories')

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if (categories) {
            res.status(200).json({ message: "Done", categories })
        } else {
            res.status(400).json({ message: "Failed to get categories" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = getCategories