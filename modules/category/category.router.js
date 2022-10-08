const addCategory = require('./controller/addCategory')
const getCategories = require('./controller/getCategories')

const router = require('express').Router()

router.post('/addCategory', addCategory)
router.get('/getCategories', getCategories)

module.exports = router