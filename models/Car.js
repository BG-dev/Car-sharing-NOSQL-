const mongoose = require('mongoose')
const { Schema, model } = mongoose

const carSchema = new Schema({
    vin: {
        type: Number,
        required: true
    },
    registrationNumber: {
        type: Number,
        required: true
    },
    productionInfo: {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    status: {
        type: String,
        default: "Unavailable"
    },
    fuelLevel: {
        type: Number,
        default: 100
    },
    mileage: {
        type: Number,
        default: 0
    },
    currentRun: {
        type: {
            startDate: Date,
            driver: {
                licenseNumber: {
                    type: Number
                },
                firstName: {
                    type: String
                },
                lastName: {
                    type: String
                },
                creditCard: {
                    number: {
                        type: Number
                    },
                    owner: {
                        type: String
                    },
                    validThrough: {
                        type: Date
                    }
                }
            },
            startFuelLevel: {
                type: Number
            },
            startMileage: {
                type: Number
            }
        },
        default: null
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [ Number ]
    },
    bookingsHistory: [
        {
            startDate: {
                type: Date,
                required: true
            },
            driver: {
                licenseNumber: {
                    type: Number,
                    required: true
                },
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                creditCard: {
                    number: {
                        type: Number,
                        required: true
                    },
                    owner: {
                        type: String,
                        required: true
                    },
                    validThrough: {
                        type: Date,
                        required: true
                    }
                }
            },
            finishFuelLevel: {
                type: Number,
                required: true
            },
            finishMileage: {
                type: Number,
                required: true
            }
        }
    ]
})

const Car = model("Car", carSchema)

module.exports = Car