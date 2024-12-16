const admin_data = require('../../MODELS/admin_model')

const createPersonalEvent = async (req,res) =>{
    const {adminId,eventTitle,eventStart,eventEnd,eventDescription} = req.body;
    try{
        const newEvent = { adminId: adminId, title: eventTitle,
            start: eventStart, end: eventEnd, desc: eventDescription};
            const updatedAdmin = await admin_data.findByIdAndUpdate(
                adminId,
                { $push: { events: newEvent } },
                { new: true, useFindAndModify: false } 
            ); 

            if (!updatedAdmin) {
                console.log('cannot create event')
                return res.status(404).json({ message: 'Admin not found' });
            }
            console.log('Successfully created an event')
            res.status(201).json({ message: 'Event created successfully', event: newEvent });
    }catch(error){
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {createPersonalEvent};