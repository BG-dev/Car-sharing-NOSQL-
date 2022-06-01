const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const mongoose = require("mongoose")
const carsRoutes = require('./routes/cars')

dotenv.config()
mongoose.connect(process.env.MONGODB_URL)

const app = express()
const port = process.env.PORT || 8000


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use('/cars', carsRoutes)

app.listen(port, () => {
    console.log(`Server was started on port: ${port}`)
})