const auth = require('../../middleware/auth')
const handleValidation = require('../../middleware/handleValidation')
const { addCategoryValidation, deleteCategoryValidation } = require('./category.validation')
const addCategory = require('./controller/addCategory')
const deleteCategory = require('./controller/deleteCategory')
const getCategories = require('./controller/getCategories')

const router = require('express').Router()

router.post('/addCategory', handleValidation(addCategoryValidation), auth(['admin']), addCategory)
router.get('/getCategories',auth(['admin', 'user']), getCategories)
router.delete('/deleteCategory/:categoryId', handleValidation(deleteCategoryValidation), auth(['admin']), deleteCategory)

module.exports = router