const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    remedies: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema);