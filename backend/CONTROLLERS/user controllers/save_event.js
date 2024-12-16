const User = require('../../MODELS/user_model');

const saveEvent = async (req, res) => {
    try {
        const { userId, title, start, end, desc } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const startDate = new Date(start);
        if (isNaN(startDate.getTime())) {
            return res.status(400).json({ error: 'Invalid start date format' });
        }
        const newEvent = {
            event_name: title,
            event_date: startDate,
            event_time: startDate.toLocaleTimeString(),
            event_details: desc || 'No description provided'
        };
        user.events.push(newEvent);
        await user.save();
        res.status(200).json({ 
            message: 'Event saved successfully.',
            event: { title, start,  end, desc }
            });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ 
            error: 'Failed to save event',
            details: error.message 
        });
    }
};
module.exports = { saveEvent };