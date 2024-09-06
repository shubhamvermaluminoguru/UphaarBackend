const Occasion = require('../Models/occasion.js')

const addOccasion = async(req, res) => {
    const {contactId, occasionName, date, isRepeate, repeateType} = req.body;
    const userId = req.user.id;

    try {
        const occasion = new Occasion({
            userId,
            contactId,
            occasionName,
            date,
            isRepeate,
            repeateType
        })
        await occasion.save();
        res.status(200).send({success: true, data: occasion, message: "Occasion added successfully"});
    } catch(error) {
        res.status(500).send({ message: 'Error in adding occasion', error });
    }
}

const getAllOccasion = async(req, res) => {
    try{
        const userId = req.user.id;
        let occasion = await Occasion.find({userId});

        res.status(200).send({ success: true, data: occasion });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getContactOccasion = async(req, res) => {
    try{
        const {contactId} = req.body;
        let occasion = await Occasion.find({contactId});

        res.status(200).send({ success: true, data: occasion });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addOccasion,
    getAllOccasion,
    getContactOccasion
}