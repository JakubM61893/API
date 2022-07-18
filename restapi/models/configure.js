const mongoose = require('mongoose')

const configureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Configure', configureSchema)