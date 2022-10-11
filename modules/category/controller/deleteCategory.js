const categoryModel = require('../../../DB/models/Categories')

const deleteCategory = async( req, res) => {
    try {
        const {categoryId} = req.params

        if(categoryId){
            const category = await categoryModel.findOneAndDelete({_id: categoryId})
            res.status(200).json({message: 'Category deleted successfully'})
        }else{
            res.status(400).json({message: 'invalid category'})
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }
   
}

module.exports = deleteCategory