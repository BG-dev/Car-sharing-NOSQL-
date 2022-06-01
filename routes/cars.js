const express = require("express"); 
const Car = require("../models/Car")

const router = express.Router()

router.get('/lowfuel', async (req, res) => {
    try {
        const cars = await Car.find({ 
            status: "In use",
            fuelLevel: {
                $lt: 25
            }
        })
        res.status(200).send({
            message: 'Cars successfully got from the database',
            cars: cars
        })   
    } catch (error) {
        console.log(error)
    }  
})

router.get('/unauthorized', async (req, res) => {
    try {
        const cars = await Car.find({ 
            status: "Reserved",
            'currentRun.driver.creditCard': null
        })
        res.status(200).send({
            message: 'Cars successfully got from the database',
            cars: cars
        })   
    } catch (error) {
        console.log(error)
    }  
})

router.post('/', async (req, res) => {
    try {
        const newCarData = req.body.newCar
        console.log(newCarData)

        const car = await Car.create({...newCarData})

        res.status(200).send({
            message: 'Car successfully added to the database',
            car
        })   
    } catch (error) {
        console.log(error)
    }  
})

router.put('/carservice', async (req, res) => {
    try {
        await Car.updateMany({
            $or: [
                {
                    'productionInfo.date': {
                        $lt: "2017-01-01"
                    }
                },
                {
                    mileage: {
                        $gt: 100000
                    }
                }
            ]
            
        },
        {
            status: "In service"
        }
        )

        res.status(200).send({
            message: 'Car successfully updated to the database'
        })   
    } catch (error) {
        console.log(error)
    }  
})

router.put('/moveusedcar', async (req, res) => {
    try {
        await Car.updateMany(
            {
                $where: 'this.bookingsHistory.length >= 2',
                status: {
                    $nin: [
                        "In use",
                        "Reserved"
                    ]
                }
            },
            {
                location: {
                    coordinates: [ 53.88828, 27.54426 ]
                }
            }
        )

        res.status(200).send({
            message: 'Car successfully updated to the database'
        })   
    } catch (error) {
        console.log(error)
    }  
})

router.delete('/:vin', async (req, res) => {
    try {
        const vin = req.params.vin

        await Car.deleteOne({
            vin
        })

        res.status(200).send({
            message: 'Car successfully deleted from the database'
        })   
    } catch (error) {
        console.log(error)
    }  
})

module.exports = router