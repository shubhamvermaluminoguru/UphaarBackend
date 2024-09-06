const mongoose = require('mongoose');

const occasionShema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        contactId: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true}, 
        occasionName: {type: String, required: true},
        date: {type: Date, required: true},
        isRepeate: {type: Boolean, required: true},
        repeateType: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Occasion', occasionShema)