const approved_events = require('../../MODELS/approved_events_model');

const fetchApprovedEvents = async (req, res) => {
  const { userId } = req.body;
  console.log('User ID:', userId);

  try {
    const findEvent = await approved_events.find({ reference_id: userId });
    if (findEvent.length === 0) {
      console.log('No approved events found');
      return res.status(404).json({ message: 'No events found' });
    }

    const formattedEvents = findEvent.map(event => {
      const {_id, event_date, event_time, event_name, event_details } = event;

      // Combine event_date and event_time into a full date string
      const dateTimeString = `${event_date} ${event_time}`;
      const startDateTime = new Date(dateTimeString);

      // Return dates as ISO strings so JavaScript can parse them
      const isoDateString = startDateTime.toISOString(); // This will return a string like "2024-11-19T00:00:00.000Z"

      return {
        id: _id,
        title: event_name,
        start: isoDateString,  // Return ISO format
        end: isoDateString,    // Return ISO format for the end (same as start in your case)
        description: event_details,
      };
    });

    console.log('============================================================= Formatted events:', formattedEvents);

    return res.status(200).json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching approved events:', error);
    return res.status(500).json({
      message: 'Something went wrong in the backend.',
      error: error.message,
    });
  }
};

module.exports = fetchApprovedEvents;
