const auth = require('../../middleware/auth')
const addCategory = require('./controller/addCategory')
const getCategories = require('./controller/getCategories')

const router = require('express').Router()

router.post('/addCategory',auth(['admin']), addCategory)
router.get('/getCategories',auth(['admin', 'user']), getCategories)

module.exports = router