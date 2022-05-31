const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')

dotenv.config()

const app = express()
const port = process.env.PORT || 8000


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.listen(port, () => {
    console.log(`Server was started on port: ${port}`)
})