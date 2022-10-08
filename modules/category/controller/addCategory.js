const categoryModel = require('../../../DB/models/Categories')

const addCategory = async(req, res) => {
    const {name} = req.body

    const category = await categoryModel.findOne({name})
    if(category){
        res.status(400).json({message: "Category already exists"})
    }else{
        const newCategory = new categoryModel({name})
        const savedCategory = await newCategory.save()
        res.status(201).json({message: "Category added successfully"})
    }
}

module.exports = addCategory