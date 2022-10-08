const categoryModel = require('../../../DB/models/Categories')

const getCategories = async(req, res) => {
    const categories = await categoryModel.find({})
    if(categories){
        res.status(200).json({message: "Done", categories})
    }else{
        res.status(400).json({message: "Failed to get categories"})
    }
}

module.exports = getCategories