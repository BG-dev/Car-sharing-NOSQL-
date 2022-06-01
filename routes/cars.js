const express = require("express"); 
const Car = require("../models/Car")

const router = express.Router()

router.get('/lowfuel', async (req, res) => {
    try {
        const cars = await Car.find({ 
            
        })
        res.status(200).send({
            message: 'Cars successfully got from the database',
            cars: cars
        })   
    } catch (error) {
        console.log(error)
    }  
})

module.exports = router