const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.String, required: true },
        name: {type: String, required: true},
        email: {type: String, required: true},
        contactNumber: {type: Number, required: true},
        address: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Contact', contactSchema)