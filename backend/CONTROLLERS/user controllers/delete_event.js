const user_data = require('../../MODELS/user_model');

const deleteEvent = async (req, res) => {
    const { eventId, userId } = req.body;
    
    if (!eventId || !userId) {
        return res.status(400).json({ error: 'Event ID and User ID are required' });
    }

    try {
        console.log('Attempting to delete event:', { eventId, userId });
        
        const user = await user_data.findById(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

      
        const eventExists = user.events.some(event => event._id.toString() === eventId);
        if (!eventExists) {
            console.error('Event not found:', eventId);
            return res.status(404).json({ error: 'Event not found' });
        }

      
        const originalLength = user.events.length;
        user.events = user.events.filter(event => event._id.toString() !== eventId);
        
       
        if (user.events.length === originalLength) {
            console.error('Event not deleted:', eventId);
            return res.status(400).json({ error: 'Failed to delete event' });
        }

        await user.save();
        console.log('Event deleted successfully');
        
        return res.status(200).json({ 
            message: 'Event deleted successfully',
            eventId: eventId
        });

    } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ 
            error: 'Failed to delete event',
            details: error.message 
        });
    }   
};

module.exports = { deleteEvent };