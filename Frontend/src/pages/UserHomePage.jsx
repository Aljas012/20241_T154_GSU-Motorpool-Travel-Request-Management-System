import React, { useEffect, useState } from "react";
import decodeAndStoreUserInfo from "./middleware/decoderToken";
import NavBarWithBellComponent from "../components/NavBarWithBellComponents";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Row, Col, Form, Card, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import FooterComponent from "../components/FooterComponents";
import '../styles/Calendar.css'; 
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function UserHomePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receivedData, setReceivedData] = useState({
    location: '',
    temperature: '',
    description: '',
    humidity: '',
    windSpeed: ''
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    desc: ''
  });

  useEffect(() => {
    decodeAndStoreUserInfo();
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const id = userInfo ? userInfo.user_id : "";

  const handleButtonClickATT = () => {
    navigate("/user/att_forms");
  };

  const handleButtonClickRTT = () => {
    navigate("/user/request_forms");
  };

  const locales = {
    'en-US': enUS
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });

  const handleAddEvent = () => {
    setCalendarEvents([...calendarEvents, newEvent]);
    setNewEvent({ title: '', start: '', end: '', desc: '' });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userInfo || !userInfo.user_id) {
        console.log('User info not available:', userInfo);
        return;
      }

      try {
        console.log('Fetching events for user:', userInfo.user_id); // Debug log
        const response = await fetch('http://localhost:8000/user/fetch_events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'user_id': userInfo.user_id
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        console.log('Raw events data received:', data); // Debug log

        if (!Array.isArray(data)) {
          console.error('Received data is not an array:', data);
          return;
        }

        // Format the events for the calendar
        const formattedEvents = data.map(event => {
          const startDate = new Date(event.event_date || event.start);
          const endDate = new Date(event.event_date || event.end);
          
          console.log('Formatting event:', {
            original: event,
            formatted: {
              id: event._id || event.id,
              title: event.event_name || event.title,
              start: startDate,
              end: endDate,
              desc: event.event_details || event.desc
            }
          }); // Debug log

          return {
            id: event._id || event.id,
            title: event.event_name || event.title,
            start: startDate,
            end: endDate,
            desc: event.event_details || event.desc
          };
        });

        console.log('Final formatted events:', formattedEvents); // Debug log
        setCalendarEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userInfo]);

  useEffect(() => {
    console.log('Calendar events updated:', calendarEvents);
  }, [calendarEvents]);

  const handleSelectEvent = (event) => {
    console.log('Selected event object:', event);
    console.log('Event ID:', event._id); // If using MongoDB _id
    console.log('Event data:', {
        id: event._id || event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        desc: event.desc
    });
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewEvent({ title: '', start: '', end: '', desc: '' });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const userId = userInfo.user_id;
    const eventData = {
        userId: userId,
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        desc: newEvent.desc || ''
    };

    try {
        // First, save to your database
        console.log('Saving event:', eventData);
        const response = await fetch('http://localhost:8000/user/save_event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save event');
        }

        const data = await response.json();
        console.log('Event saved successfully:', data);
        setShowModal(false);
        setNewEvent({ title: '', start: '', end: '', desc: '' });
        const googleEvent = {
            summary: eventData.title,
            description: eventData.desc,
            start: {
                dateTime: new Date(eventData.start).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            end: {
                dateTime: new Date(eventData.end).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        };

        // Create event in Google Calendar
        const calendarResponse = await fetch('http://localhost:8000/user/create_google_event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(googleEvent)
        });

        if (!calendarResponse.ok) {
            throw new Error('Failed to create Google Calendar event');
        }

        const calendarData = await calendarResponse.json();
        console.log('Google Calendar event created:', calendarData);

        // Add the new event to the calendar
        const newCalendarEvent = {
            title: newEvent.title,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
            desc: newEvent.desc || ''
        };

        console.log('Adding new event to calendar:', newCalendarEvent);
        setCalendarEvents(prevEvents => [...prevEvents, newCalendarEvent]);

        handleClose();
        setNewEvent({ title: '', start: '', end: '', desc: '' });
    } catch (error) {
        console.error('Error saving event:', error);
    }
  };

  const sendLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {
                    const response = await fetch("http://localhost:8000/user/api/weather", {
                        method: "POST",
                        body: JSON.stringify({ latitude, longitude }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const weather = await response.json();
                    setReceivedData(weather);

                } catch (error) {
                    console.error("Error fetching data from the backend:", error);
                }
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
};

  useEffect(() => {
    sendLocation();
    const interval = setInterval(sendLocation, 60000);
    return () => clearInterval(interval);
  }, []);




    const deleteEvent = async (event) => {
      
        if (!event || !event.id) {
            console.error('Invalid event or missing event ID:', event);
            return;
        }

        const eventId = event.id;
        const userId = userInfo.user_id;
        const requestData = { eventId, userId };
        console.log('Attempting to delete event with ID:', eventId);

        try {
            const response = await fetch('http://localhost:8000/user/delete_event', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete event');
            }

            const responseData = await response.json();
            console.log('Event deleted successfully:', responseData);

            // Update the UI
            setCalendarEvents(prevEvents => 
                prevEvents.filter(e => e.id !== eventId)
            );

            // Close the modal after successful deletion
            handleCloseEventModal();

        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event: ' + error.message);
        }
    };








  return (
    <>
      <NavBarWithBellComponent />
      <main>
        <Container style={{ minHeight: "80vh" }}>
          <Row>
            <Row className="d-flex align-items-center mt-3">
              <Col>
                <div style={{ marginTop: "1rem" }}>
                  <h5 style={{ fontFamily: "Helvetica", fontWeight: 500, marginBottom: 0 }}>
                    {userInfo ? (userInfo.college_name ? userInfo.college_name : "COLLEGE NAME NOT SET") : "Loading..."}
                  </h5>
                  <h4 style={{ fontFamily: "Helvetica", fontWeight: 700 }}>
                    OFFICE CODE:{" "}
                    <span style={{ color: "#CD8800" }}>
                      {userInfo ? (userInfo.office_code ? userInfo.office_code : "OFFICE CODE NOT SET") : "Loading..."}
                    </span>
                  </h4>
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <a href="" style={{ color: "#000000", textDecoration: "none", padding: "1rem 1.8rem", fontWeight: "500" }} className="mx-2">Home</a>
                <a href="/user/about_us" style={{ color: "#000000", textDecoration: "none", padding: "1rem 1.8rem", fontWeight: "500" }} className="mx-2">About</a>
                <a href="/user/user_guide" style={{ color: "#000000", textDecoration: "none", padding: "1rem 1.8rem", fontWeight: "500" }} className="mx-2">User Guide</a>
                <a href="/user/request" style={{ color: "#000000", textDecoration: "none", padding: "1rem 1.8rem", fontWeight: "500" }} className="mx-2">Request</a>
                <a href={`/user/id=${id}/profile`} style={{ color: "#000000", textDecoration: "none", padding: "1rem", fontWeight: "500" }} className="mx-2">Profile</a>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 style={{ fontFamily: "Helvetica", marginTop: "1rem" }}>
                  Results for{" "}
                  <span style={{ fontWeight: "700" }}>
                    {receivedData.location || "Loading..."}
                  </span>
                </h6>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src="../images/WEATHER_ICON.png" alt="weatherIcon" style={{ width: "55px", height: "auto" }} />
                  <h6 style={{ fontFamily: "Helvetica", fontWeight: "500", marginLeft: "0.8rem", marginTop: "5px", fontSize: "50px" }}>
                    {receivedData.temperature ? `${receivedData.temperature} ` : "Loading..."}
                  </h6>
                  <div style={{ marginBottom: "1.2rem" }}>
                    <span style={{ fontFamily: "Helvetica", fontWeight: "400", marginLeft: "0.8rem", fontSize: "16px" }}>°C</span>
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <p style={{ fontFamily: "Helvetica", margin: "0", padding: "0", lineHeight: "1.2", fontSize: "14px" }}>Description: {receivedData.description || "Loading..."}</p>
                    <p style={{ fontFamily: "Helvetica", margin: "0", padding: "0", lineHeight: "1.2", fontSize: "14px" }}>Humidity:  {receivedData.humidity || "Loading..."}</p>
                    <p style={{ fontFamily: "Helvetica", margin: "0", padding: "0", lineHeight: "1.2", fontSize: "14px" }}>Wind: {receivedData.windSpeed ? `${receivedData.windSpeed} km/h  ` : "Loading..."}</p>
                  </div>
                </div>
                <div style={{ margin: "2rem 0 2rem 0" }}>
                  <Card style={{ width: "100%", minHeight: "25rem" }}>
                    <Card.Body>
                      {error && (
                        <div className="alert alert-danger">
                          {error}
                        </div>
                      )}
                      {loading ? (
                        <div className="text-center">
                          <p>Loading calendar...</p>
                        </div>
                      ) : (
                        <div className="calendar-wrapper" style={{ height: '350px', overflow: 'auto' }}>
                          <div className="d-flex justify-content-start mb-3" style={{ paddingLeft: '20px' }}>
                            <button onClick={handleShow} className="btn btn-primary" style={{ background: "#0760A1", border: "none", borderRadius: "4px", marginBottom: "5px" }}>
                              Add Event
                            </button>
                          </div>
                          <Calendar
                            localizer={localizer}
                            events={calendarEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%' }}
                            onSelectEvent={handleSelectEvent}
                            views={['month', 'week', 'day']}
                            defaultView="month"
                            tooltipAccessor={event => event.desc}
                            components={{
                              month: {
                                event: (props) => {
                                  const now = new Date();
                                  const eventEnd = new Date(props.event.end);
                                  const isPastEvent = eventEnd < now;
                                  
                                  return (
                                    <div
                                      className={`custom-event ${isPastEvent ? 'past-event' : 'future-event'}`}
                                      title={props.title}
                                    >
                                      {props.title}
                                    </div>
                                  );
                                }
                              }
                            }}
                            eventPropGetter={(event) => {
                              const now = new Date();
                              const eventEnd = new Date(event.end);
                              const isPastEvent = eventEnd < now;

                              return {
                                className: `custom-event ${isPastEvent ? 'past-event' : 'future-event'}`
                              };
                            }}
                            dayPropGetter={(date) => {
                              const now = new Date();
                              const hasPastEvent = calendarEvents.some(event => {
                                const eventEnd = new Date(event.end);
                                return date.getDate() === eventEnd.getDate() && 
                                       date.getMonth() === eventEnd.getMonth() && 
                                       date.getFullYear() === eventEnd.getFullYear() && 
                                       eventEnd < now;
                              });
                              
                              const hasFutureEvent = calendarEvents.some(event => {
                                const eventEnd = new Date(event.end);
                                return date.getDate() === eventEnd.getDate() && 
                                       date.getMonth() === eventEnd.getMonth() && 
                                       date.getFullYear() === eventEnd.getFullYear() && 
                                       eventEnd >= now;
                              });

                              return {
                                className: hasPastEvent ? 'has-past-events' : hasFutureEvent ? 'has-future-events' : ''
                              };
                            }}
                          />
                          {calendarEvents.length === 0 && !loading && (
                            <div className="text-center mt-2">
                              <small>No events found in your calendar</small>
                            </div>
                          )}
                          <Modal show={showModal} onHide={handleClose} centered dialogClassName="custom-modal wide-modal" style={{ borderRadius: '0' }}>
                            <Modal.Header style={{ background: '#0760A1', color: 'white', borderRadius: '0', border: 'none' }}>
                              <Modal.Title>Add New Event</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ borderRadius: '0' }}>
                              <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Event Title</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>Start Date & Time</Form.Label>
                                  <Form.Control
                                    type="datetime-local"
                                    name="start"
                                    value={newEvent.start}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>End Date & Time</Form.Label>
                                  <Form.Control
                                    type="datetime-local"
                                    name="end"
                                    value={newEvent.end}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    name="desc"
                                    value={newEvent.desc}
                                    onChange={handleInputChange}
                                    rows={3}
                                  />
                                </Form.Group>

                                <Button type="submit" variant="primary">
                                  Save Event
                                </Button>
                              </Form>
                            </Modal.Body>
                          </Modal>


                          <Modal show={showEventModal} onHide={handleCloseEventModal} centered dialogClassName="custom-modal wide-modal" style={{ borderRadius: '0' }}>
                            <Modal.Header style={{ background: '#0760A1', color: 'white', borderRadius: '0', border: 'none' }}>
                              <Modal.Title>Event Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {selectedEvent && (
                                <div className="event-details-container">
                                  <div className="event-header" style={{ borderBottom: '2px solid #0760A1', paddingBottom: '10px', marginBottom: '15px' }}>
                                    <h4 style={{ color: '#0760A1', fontWeight: 'bold', margin: 0 }}>{selectedEvent.title}</h4>
                                  </div>
                                  <div className="event-info" style={{ marginBottom: '20px' }}>
                                    <div className="info-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                      <i className="far fa-clock" style={{ color: '#0760A1', marginRight: '10px', width: '20px' }}></i>
                                      <div>
                                        <p style={{ margin: 0, fontWeight: '500' }}>Start Time</p>
                                        <p style={{ margin: 0, color: '#666' }}>
                                          {new Date(selectedEvent.start).toLocaleString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="info-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                      <i className="far fa-clock" style={{ color: '#0760A1', marginRight: '10px', width: '20px' }}></i>
                                      <div>
                                        <p style={{ margin: 0, fontWeight: '500' }}>End Time</p>
                                        <p style={{ margin: 0, color: '#666' }}>
                                          {new Date(selectedEvent.end).toLocaleString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="info-row" style={{ display: 'flex', alignItems: 'start', marginTop: '15px' }}>
                                      <i className="far fa-file-alt" style={{ color: '#0760A1', marginRight: '10px', width: '20px', marginTop: '3px' }}></i>
                                      <div>
                                        <p style={{ margin: 0, fontWeight: '500' }}>Description</p>
                                        <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                                          {selectedEvent.desc || 'No description provided'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Modal.Body>
                            <Modal.Footer style={{ borderTop: '1px solid #dee2e6', padding: '15px 20px' }}>
                              <Button onClick={handleCloseEventModal} style={{ backgroundColor: '#0760A1', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: '500' }}>Close</Button>
                              <Button 
                                onClick={() => {
                                    console.log('Selected Event:', selectedEvent); // Debug log
                                    console.log('Event ID:', selectedEvent.id); // Should show the ID
                                    deleteEvent(selectedEvent);
                                }} 
                                style={{ 
                                    backgroundColor: '#FF2929', 
                                    border: 'none', 
                                    padding: '8px 20px', 
                                    borderRadius: '4px', 
                                    fontWeight: '500' 
                                }}
                              >
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col>
                <Form id="userlandingpage">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginTop: "2rem" }}>
                    <div style={{ marginLeft: "8.5rem" }}>
                      <h4 style={{ fontFamily: "Helvetica", fontWeight: "600", margin: 0, color: "#0760A1", textAlign: "start" }}>Good day, BUKSUan</h4>
                      <h4 style={{ fontFamily: "Helvetica", fontWeight: "500", margin: 0, textAlign: "start" }}>Hope you have a great day!</h4>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "0.5rem", marginLeft: "6rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "3rem" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ position: "relative", display: "inline-block", marginTop: "8px", marginRight: "0.5rem" }}>
                            <img src="../images/Ell2.png" alt="Descriptive text" style={{ width: "2.5rem", height: "auto" }} />
                            <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "Helvetica", color: "#FFFFFF", fontWeight: "600", fontSize: "1.3rem" }}>1</span>
                          </div>
                          <button onClick={handleButtonClickATT} style={{ padding: "0.5rem 1rem", background: "linear-gradient(to right, #0760A1 80%, #CD8800 80%)", color: "#FFFFFF", border: "none", borderRadius: "4px", cursor: "pointer", width: "15rem", fontFamily: "Helvetica", fontWeight: "600", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                            <span style={{ marginLeft: "0.8rem" }}>Authority to travel</span>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                          </button>
                        </div>
                      </div>
                      <h6 style={{ fontFamily: "Helvetica", color: "#0760A1", marginTop: "0.5rem", textAlign: "center", width: "100%", marginLeft: "5.2rem" }}>Request authorization for official travel</h6>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ position: "relative", display: "inline-block", marginTop: "8px", marginRight: "0.5rem" }}>
                            <img src="../images/Ell2.png" alt="Descriptive text" style={{ width: "2.5rem", height: "auto" }} />
                            <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "Helvetica", color: "#FFFFFF", fontWeight: "600", fontSize: "1.3rem" }}>2</span>
                          </div>
                          <button onClick={handleButtonClickRTT} style={{ padding: "0.5rem 1rem", background: "linear-gradient(to right, #0760A1 80%, #CD8800 80%)", color: "#FFFFFF", border: "none", borderRadius: "4px", cursor: "pointer", width: "15rem", fontFamily: "Helvetica", fontWeight: "600", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                            <span style={{ marginLeft: "0.8rem" }}>Request to travel</span>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                          </button>
                        </div>
                      </div>
                      <h6 style={{ fontFamily: "Helvetica", color: "#0760A1", marginTop: "0.5rem", textAlign: "center", width: "100%", marginLeft: "4.2rem" }}>Submit travel request and itineraries</h6>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </Row>
        </Container>
      </main>
      <FooterComponent />
    </>
  );
}

export default UserHomePage;
