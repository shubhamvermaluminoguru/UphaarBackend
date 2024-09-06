const Contact = require('../Models/contact.js')

const addContact = async(req, res) =>{
    try {
        const {name, email, contactNumber, address} = req.body;
        const userId = req.user.id;

        let contact = await Contact.findOne({userId, contactNumber})
        
        
        if(contact) {
            res.status(200).send({ message: 'Contact Already exists' });
        } else {
            contact = new Contact({
                userId,
                name, 
                email, 
                contactNumber, 
                address
            })
            await contact.save();
            res.status(200).send({ success: true ,message: 'Contact Addded Successfully', data: contact });
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Error in adding contact', error });
    }
}

const getContact = async(req, res) => {
    try {
        const userId = req.user.id;
        let contact = await Contact.find({userId})
        
        res.status(200).send({ success: true, data: contact });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addContact,
    getContact
};