import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Modal, Form, Button } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/MotorpoolHomePage.css";

import NavbarComponent from "../../components/NavbarComponent";
import RequestsModal from "../../components/RequestsModal";
import PostTripInspectionModal from "../../components/PostTripInspectionModal";
import OfficeCodeModal from "../../components/OfficeCodeModal";
import DriversListModal from "../../components/DriverListModal";
import FinalApprovalModal from "../../components/FInalApporvalModal";
import AdminGuideModal from "../../components/AdminGuideApproval";
import VehicleModal from "../../components/VehicleModal";
import SidebarComponent from "../../components/SideBar";
import WeatherInfo from "../../components/WeatherInfoComponent";

// Calendar localization setup
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

function MotorpoolHomePage() {
  /** REQUEST MODAL FUNC */
  const [requestShow, setRequestModalShow] = useState(false);
  const requestClose = () => setRequestModalShow(false);
  const requestModalShow = () => setRequestModalShow(true);

  /** POST TRIP MODAL FUNC */
  const [postShow, setPostModalShow] = useState(false);
  const postClose = () => setPostModalShow(false);
  const postModalShow = () => setPostModalShow(true);

  /** OFFICE CODE MODAL FUNC */
  const [officeShow, setOfficeModalShow] = useState(false);
  const officeClose = () => setOfficeModalShow(false);
  const officeModalShow = () => setOfficeModalShow(true);

  /** DRIVER MODAL FUNC */
  const [driverShow, setDriverModalShow] = useState(false);
  const driverClose = () => setDriverModalShow(false);
  const driverModalShow = () => setDriverModalShow(true);

  /** FINAL APPROVAL MODAL FUNC */
  const [finalShow, setFinalModalShow] = useState(false);
  const finalClose = () => setFinalModalShow(false);
  const finalModalShow = () => setFinalModalShow(true);

  /** ADMIN MODAL FUNC */
  const [guideShow, setGuideModalShow] = useState(false);
  const guideClose = () => setGuideModalShow(false);
  const guideModalShow = () => setGuideModalShow(true);

  /** VEHICLE MODAL FUNC */
  const [vehicleShow, sevehicleModalShow] = useState(false);
  const vehicleClose = () => sevehicleModalShow(false);
  const vehiclelShow = () => sevehicleModalShow(true);

  // Calendar State
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    desc: ''
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/approved_travel_events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();

        console.log('API Response:', data);

        const formattedEvents = data.map(event => {
          try {
            console.log(`Raw Date: ${event.event_date}, Raw Time: ${event.event_time}`);

            const [month, day, year] = event.event_date.split(' ');
            const eventTime = event.event_time || '00:00:00';

            const [hourPart, minutePart] = eventTime.split(':');
            const hours = parseInt(hourPart, 10);
            const minutes = minutePart ? parseInt(minutePart.split(' ')[0], 10) : 0;
            const ampm = minutePart ? minutePart.split(' ')[1] : 'AM';

            const adjustedHours = (ampm === 'PM' && hours < 12) ? hours + 12 : (ampm === 'AM' && hours === 12) ? 0 : hours;

            const eventDate = new Date(`${month}-${day}-${year} ${adjustedHours}:${minutes < 10 ? '0' + minutes : minutes}`);

            if (isNaN(eventDate)) {
              console.error(`Invalid date for event: ${event.event_name}`);
              return null;
            }

            return {
              id: event._id,
              title: event.event_name,
              start: eventDate,
              end: new Date(eventDate.getTime() + 60 * 60 * 1000),
              desc: event.event_details,
            };
          } catch (error) {
            console.error(`Error parsing event ${event.event_name}:`, error);
            return null;
          }
        }).filter(event => event !== null);

        console.log('Formatted Events:', formattedEvents);
        setCalendarEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to save the new event
    // After saving, you can fetch events again or update the state
    handleClose();
  };

  // Custom styles for the DataTable
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        justifyContent: "center",
        backgroundColor: "#f1f1f1",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "500",
        borderLeft: "1px solid #ddd",
      },
    },
    table: {
      style: {
        backgroundColor: "#e9f7fb",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f9f9f9",
        "&:nth-child(odd)": {
          backgroundColor: "#f1f1f1",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "white",
      },
    },
  };

  /******************************************* SA SELECTION OF YEAR NI SYA ************/
  /** PARA LEGIT ANG DAYS PER MONTH / 30 OR 31 DAYS */
  const [selectedMonth, setSelectedMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(31);

  useEffect(() => {
    // Determine number of days based on the selected month
    if (selectedMonth === "February") {
      setDaysInMonth(28); // Assuming it's not a leap year
    } else if (
      selectedMonth === "April" ||
      selectedMonth === "June" ||
      selectedMonth === "September" ||
      selectedMonth === "November"
    ) {
      setDaysInMonth(30);
    } else {
      setDaysInMonth(31);
    }
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  /** PARA SA YEAR */
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const hardcodedEvents = [
    {
      id: 1,
      title: 'Test Event 1',
      start: new Date('2024-11-17T17:01:00'),
      end: new Date('2024-11-17T18:01:00'),
      desc: 'This is a test event'
    },
    {
      id: 2,
      title: 'Test Event 2',
      start: new Date('2024-11-18T17:01:00'),
      end: new Date('2024-11-18T18:01:00'),
      desc: 'This is another test event'
    }
  ];


  const eventDays = calendarEvents.reduce((acc, event) => {

    const eventDate = new Date(event.start).toLocaleDateString('en-CA'); 
    acc[eventDate] = true; 
    return acc;
  }, {});

 
  const dayPropGetter = (date) => {
    const dateString = new Date(date).toLocaleDateString('en-CA');  
    if (eventDays[dateString]) {
      return {
        style: { backgroundColor: '#0D92F4' } // Desired color for event days
      };
    }
    return {};
  };
  

  // Handle event selection
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Close modal handler
  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      {/** HEADER */}
      <NavbarComponent />

      <main>
        <Container fluid>
          <Row className="customRow p-0">
            {/** SIDEBAR */}
            <SidebarComponent
              requestModalShow={requestModalShow}
              postModalShow={postModalShow}
              officeModalShow={officeModalShow}
              driverModalShow={driverModalShow}
              finalModalShow={finalModalShow}
              guideModalShow={guideModalShow}
            />

            {/** LEFT SIDE */}
            <Col md={7}>
              <div style={{ padding: "2rem" }}>
                <Card>
                  <div className="customCard3">
                    <img
                      src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732368935/profileIcon_i2zkef.svg"
                      alt="icon"
                      style={{ height: "5rem", width: "auto" }}
                    />
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "550",
                        margin: "0",
                      }}
                    >
                      Good Day, Admin
                    </h5>
                  </div>
                </Card>

                {/** 3 CARDS */}
                <Row style={{ marginTop: "3rem" }}>
                  <div className="customRowAlignement">
                    <Col>
                      <Card className="customCard2" onClick={requestModalShow}>
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">REQUESTS</h6>
                          </div>
                          <div className="customP8">
                            <p className="m-0">Today's Number of Request</p>
                            <p className="customP8Num">#</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="customCard2" onClick={vehiclelShow}>
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">VEHICLES</h6>
                          </div>
                          <div className="customP8 pb-0">
                            <p className="m-0">Available</p>
                            <p className="customP8Num">#</p>
                          </div>
                          <div className="customP8">
                            <p className="m-0">Total Number of Vehicles</p>
                            <p className="customP8Num">#</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="customCard2">
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">SERVICES COMPLETED</h6>
                          </div>
                          <div className="customP8">
                            <p className="m-0">Monthly Services Completed</p>
                            <p className="customP8Num">#</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </div>
                </Row>
              </div>
            </Col>

            {/** RIGHT SIDE */}
            <Col>
              <div style={{ padding: "1.6rem 0 0 0" }}>
                <div>
                  <p className="customHeader">MOTORPOOL OFFICE</p>
                </div>
                <div>
                  <WeatherInfo
                    city="Malaybalay City, Bukidnon"
                    temperature="24"
                    precipitation="69"
                    humidity="77"
                    windSpeed="5"
                  />
                  <div className="mt-4">
                    <p className="customP7">Calendar of Year 2024</p>
                    <Card style={{ height: "60vh", width: "100%" }}>
                      <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        onSelectEvent={handleSelectEvent}
                        views={['month', 'week', 'day']}
                        defaultView="month"
                        dayPropGetter={dayPropGetter}
                      />
                      {calendarEvents.length === 0 && !loading && (
                        <div className="text-center mt-2">
                          <small>No events found in your calendar</small>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/** MODALS ***********************************************************/}
          <VehicleModal
            vehicleShow={vehicleShow}
            vehicleClose={vehicleClose}
            customStyles={customStyles}
          />
          <RequestsModal
            requestShow={requestShow}
            requestClose={requestClose}
            customStyles={customStyles}
          />
          <PostTripInspectionModal
            postShow={postShow}
            postClose={postClose}
            handleMonthChange={handleMonthChange}
            daysInMonth={daysInMonth}
            years={years}
          />
          <OfficeCodeModal
            officeShow={officeShow}
            officeClose={officeClose}
            customStyles={customStyles}
          />
          <DriversListModal
            driverShow={driverShow}
            driverClose={driverClose}
            customStyles={customStyles}
          />
          <FinalApprovalModal finalShow={finalShow} finalClose={finalClose} />
          <AdminGuideModal guideShow={guideShow} guideClose={guideClose} />

          {/* Event Details Modal */}
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
                    // Call your delete function here if needed
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
        </Container>
      </main>
    </>
  );
}

export default MotorpoolHomePage;
