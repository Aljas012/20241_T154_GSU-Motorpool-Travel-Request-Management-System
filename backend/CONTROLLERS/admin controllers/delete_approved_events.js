const approved_events = require('../../MODELS/approved_events_model');
const admin_data = require('../../MODELS/admin_model');

const deleteApprovedEvents = async (req, res) => {
    const { data: reference, adminId } = req.body;
    console.log('Reference for event that is forwarded to backend:', reference);

    try {
     
        const findEvent = await approved_events.findOneAndDelete({ _id: reference });

        if (!findEvent) {          
            const findPersonalEvent = await admin_data.findOne({ _id: adminId });

            if (!findPersonalEvent) {
                return res.status(404).json({ message: 'Cannot find the admin or the selected event.' });
            }
     
            const updatedAdmin = await admin_data.findOneAndUpdate(
                { _id: adminId },
                { $pull: { events: { _id: reference } } }, 
                { new: true } 
            );

            if (!updatedAdmin) {
                return res.status(404).json({ message: 'Event not found in the admin\'s events list.' });
            }
            console.log('Successfull deletion of event')
            return res.status(200).json({ message: `Successfully deleted the event with id ${reference} from the admin's events.` });
        }
        console.log('Successfulf deletion of event')
        return res.status(200).json({ message: `Successfully deleted the event with id ${reference}.` });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Something went wrong in the backend.' });
    }
};

module.exports = { deleteApprovedEvents };
