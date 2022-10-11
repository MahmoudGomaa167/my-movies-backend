const joi = require('joi')

const addCategoryValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        name: joi.string().required()
    })
}

const deleteCategoryValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        categoryId: joi.string().required().min(24).max(24)
    })
}

module.exports = {
    addCategoryValidation,
    deleteCategoryValidation
}