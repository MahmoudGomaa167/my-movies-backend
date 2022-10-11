const categoryModel = require('../../../DB/models/Categories')

const addCategory = async (req, res) => {
    try {
        const { name } = req.body

        const category = await categoryModel.findOne({ name })
        if (category) {
            res.status(400).json({ message: "Category already exists" })
        } else {
            const newName = name.split('').map((item, index) => index === 0 ? item.toUpperCase() : item).join('')
            const newCategory = new categoryModel({ name: newName })
            const savedCategory = await newCategory.save()
            res.status(201).json({ message: "Category added successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = addCategory