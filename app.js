const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const runDB = require('./DB/connectDB')
const { userRouter, movieRouter, categoryRouter } = require('./router/allRoutes')
const cors = require('cors')

dotenv.config()

const app = express()


app.use(express.json())
app.use('/profileImages',express.static(path.join(__dirname, 'profileImages')))
app.use(cors())

runDB()

app.use(userRouter, movieRouter, categoryRouter)
app.listen(process.env.PORT)