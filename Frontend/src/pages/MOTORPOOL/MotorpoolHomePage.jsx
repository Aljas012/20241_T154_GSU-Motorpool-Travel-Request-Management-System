import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Modal, Form, Button, CardBody } from "react-bootstrap";
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
import { style } from "framer-motion/client";

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
  const [vehicleShow, setVehicleModalShow] = useState(false);
  const vehicleClose = () => setVehicleModalShow(false);
  const vehicleShowModal = () => setVehicleModalShow(true);

  // Calendar State
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleCloseEventModal = () => { setShowEventModal(false);setSelectedEvent(null);};
  const [personalEvent,setPersonalEvent] = useState('')
  const [todaysRequest,setTodaysRequest] = useState('')
  const [regiresteredVehicle,setRegisteredVehicle] = useState('')
  const [totalApprovedRequest,setTotalApprovedRequest] = useState('')
  const [vehicleTotal,setAvailableTotal] = useState('')
  const [errorModal,setShowErrorModal] = useState(false)
      const [errorMessage,setErrorMessage] = useState('')
      const [errorColor,setErrorColor] = useState('')
      const [errorIcon,setErrorIcon] = useState('')
      const [errorDiv,setErrorDiv] = useState('')
      const warning = '#FCC737'
      const danger = '#C63C51'
      const success = '#6EC207'
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

  // Initial state for the new event
  const initialEventState = {
    title: '',
    start: '',
    end: '',
    desc: ''
  };

  function fetchAdminId(adminId){
    const adminInfo = localStorage.getItem("admin_info");
    const parsedAdminInfo = JSON.parse(adminInfo);
    return adminId = parsedAdminInfo.admin_id;
  }

  useEffect(()=>{
  const sendLocation = async () => {
    const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
    const token = adminInfo.admin_token;

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
                            Authorization: `Bearer ${token}`
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
sendLocation()
},[])




  useEffect(() => {
    const fetchEvents = async () => {
      const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
      const token = adminInfo.admin_token;
      try {
        const response = await fetch('http://localhost:8000/admin/approved_travel_events',{
          method:'GET',
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
          
        });
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();

        if (!data || data.length === 0) {
          console.log('No events found');
          setCalendarEvents([]); 
          return;
        }

        const formattedEvents = data.map(event => {
          const eventDate = new Date(event.event_date);
          return {
            id: event._id,
            title: event.event_name,
            start: eventDate,
            end: eventDate, 
            desc: event.event_details,
          };
        });

        setCalendarEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
        setLoading(false);
      }
    };

    const fetchPersonalEvent = async () => {
      const adminId = fetchAdminId();
      const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
      const token = adminInfo.admin_token;
      try {
        const fetchEvent = await fetch(`http://localhost:8000/admin/fetch_personal_event/${adminId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });

        if (!fetchEvent.ok) {
          console.log('Something went wrong in the backend');
          return;
        }

        const data = await fetchEvent.json();
        console.log('Successfully fetched personal events', data);

        const personalEvents = data.data.map(event => {
          return {
            id: event._id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            desc: event.desc,
          };
        });

        console.log('Personal Events:', personalEvents);
        setCalendarEvents(prevEvents => [...prevEvents, ...personalEvents]);
      } catch (error) {
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
      }
    };

    fetchPersonalEvent();
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


  function eventInputChecker(eventTitle, eventStart, eventEnd, eventDescription) {
    if (eventTitle === '' || eventStart === '' || eventEnd === '' || eventDescription === '') {
        return false;
    }
    return true;
}





  const handleSubmit = async (e) => {
    e.preventDefault()
    const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
    const token = adminInfo.admin_token;
    
      const adminId = fetchAdminId();
      const eventTitle = newEvent.title;
      const eventStart = newEvent.start;
      const eventEnd = newEvent.end;
      const eventDescription = newEvent.desc;
      const valid = await eventInputChecker(eventTitle,eventStart,eventEnd,eventDescription)
   if(!valid){
    alert('Null fields not allowed'); return;
  } 
    const data = {adminId,eventTitle,eventStart,eventEnd,eventDescription};
       try{
          const creatingEvent = await fetch('http://localhost:8000/admin/save_event',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(data)
        });

          if(!creatingEvent.ok){
            setShowErrorModal(true)     
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
            setErrorColor('white')
            setErrorDiv(danger)
            setErrorMessage('Something went wrong while processing your request.')

            return;
          }
              setShowErrorModal(true)     
              setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734277000/check_jmj8om.png')
              setErrorColor('white')
              setErrorDiv(success)
              setErrorMessage('Congratulations you have successfull create an event')

          fetchPersonalEvent()
          setNewEvent(initialEventState); 
          handleClose(); 
      }catch(error){
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
      }
  };
      

    const deleteEvent = async (reference) =>
       {
        const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
        const token = adminInfo.admin_token;
        const adminId = fetchAdminId();
        const data = {data:reference,adminId};
        try{
              const response = await fetch('http://localhost:8000/admin/delete_event', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            if(!response.ok){
              setShowErrorModal(true)     
              setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
              setErrorColor('white')
              setErrorDiv(danger)
              setErrorMessage('Something went wrong while processing your request.')
              return;
            }

            setShowErrorModal(true)     
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734277000/check_jmj8om.png')
            setErrorColor('white')
            setErrorDiv(success)
            setErrorMessage('Successfully delete the event')




            setShowEventModal(false); 
        }catch(error){  
          setShowErrorModal(true)     
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
          setErrorColor('white')
          setErrorDiv(danger)
          setErrorMessage('Something went wrong. Please check your internet connection.')
        }
    } 


    const fetchPersonalEvent = async () => { //this is the personal event idiots
        const adminId = fetchAdminId();
        const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
        const token = adminInfo.admin_token;
        try {
            const fetchEvent = await fetch(`http://localhost:8000/admin/fetch_personal_event/${adminId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (!fetchEvent.ok) {
                console.log('Something went wrong in the backend');
                return;
            }

            const data = await fetchEvent.json();
            setPersonalEvent(data);
            console.log('Successfully fetched personal events', data);
            const personalEvents = data.data.map(event => {
              return {
                  id: event._id,
                  title: event.title,
                  start: new Date(event.start),
                  end: new Date(event.end), 
                  desc: event.desc,
              };
          });

          setCalendarEvents(prevEvents => [...prevEvents, ...personalEvents]); 
        } catch (error) {
          setShowErrorModal(true)     
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
          setErrorColor('white')
          setErrorDiv(danger)
          setErrorMessage('Something went wrong. Please check your internet connection.')
        }
    };

  
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


  const [selectedMonth, setSelectedMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(31);

  useEffect(() => {

    if (selectedMonth === "February") {
      setDaysInMonth(28); 
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

  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }
  const eventDays = calendarEvents.reduce((acc, event) => {
    const eventDate = new Date(event.start).toLocaleDateString('en-CA'); 
    acc[eventDate] = true; 
    return acc;
  }, {});

 
  const dayPropGetter = (date) => {
    const dateString = new Date(date).toLocaleDateString('en-CA');  
    if (eventDays[dateString]) {
      return { style: { backgroundColor: '#0A5EB0', color: 'black' } }; // Change color to red for event days
    }
    return {}; // Default style
  };
  


  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  useEffect(() => {
    const fetchPersonalEvents = async () => {
      const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
      const token = adminInfo.admin_token;
      const adminId = fetchAdminId(); 
      if (!adminId) {
        console.log('Admin ID not available');
        return;
      }

      try {
        console.log('Fetching personal events for admin:', adminId); // Debug log
        const response = await fetch(`http://localhost:8000/admin/fetch_personal_event/${adminId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch personal events');
        }

        const data = await response.json();

        if (!Array.isArray(data.data)) {
          return;
        }

        const formattedPersonalEvents = data.data.map(event => {
          const startDate = new Date(event.start); 
          const endDate = new Date(startDate); 
          endDate.setHours(23, 59, 59, 999);

          return {
            id: event._id,
            title: event.title,
            start: startDate,
            end: endDate, 
            desc: event.desc,
          };
        });

       
        setCalendarEvents(prevEvents => [...prevEvents, ...formattedPersonalEvents]); 
        setLoading(false);
      } catch (error) {
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
        setLoading(false);
      }
    };
    fetchPersonalEvents();
  }, []); 



  useEffect(()=>{
    const getTodaysTotal = async () =>
        {
          const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
          const token = adminInfo.admin_token;
          let data;
          try{
              const response = await fetch('http://localhost:8000/admin/todays_total_request',{
                method: 'GET',
                headers:{
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              })
              if(!response.ok){
                data = 0
                setTodaysRequest(data.count)
                setTotalApprovedRequest(data.totalApproved)
                return;
              }
               data = await response.json()
              setTodaysRequest(data.count)
              setTotalApprovedRequest(data.totalApproved)
            }catch(error){
              setShowErrorModal(true)     
              setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
              setErrorColor('white')
              setErrorDiv(danger)
              setErrorMessage('Something went wrong. Please check your internet connection.')
            }
    } 
    getTodaysTotal()
  },[])
  useEffect(() => {
    const getAvailableVehicle = async () => {
      const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
      const token = adminInfo.admin_token;
      try {
        const response = await fetch('http://localhost:8000/admin/available_vehicle', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });
  
        const data = await response.json();  
        console.log('API Response:', data); 
        if (!response.ok) {
          setRegisteredVehicle(data.total);
          setAvailableTotal(data.count);
          return;
        }
  
        // Successfully fetched the data
        console.log('success vehicle count', data);
        setRegisteredVehicle(data.total);
        setAvailableTotal(data.count);
  
      } catch (error) {
        console.error('Fetch error:', error);
        setShowErrorModal(true);
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png');
        setErrorColor('white');
        setErrorDiv(danger);
        setErrorMessage('Something went wrong. Please check your internet connection.');
      }
    };
  
    getAvailableVehicle(); 
  }, []);
  

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
            <Col md={6}>
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
                            <p className="customP8Num">{todaysRequest || '0'}</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="customCard2" onClick={vehicleShowModal}>
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">VEHICLES</h6>
                          </div>
                          <div className="customP8 pb-0">
                            <p className="m-0">Available</p>
                            <p className="customP8Num">{vehicleTotal || '0'}</p>
                          </div>
                          <div className="customP8">
                            <p className="m-0">Total Number of Vehicles</p>
                            <p className="customP8Num">{regiresteredVehicle || '0'}</p>
                          </div>
                        </div>
                      </Card>
                    </Col>  
                    <Col>
                      <Card className="customCard2" >
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">SERVICES COMPLETED</h6>
                          </div>
                          <div className="customP8">
                            <p className="m-0">Total Approved Requests</p>
                            <p className="customP8Num">{totalApprovedRequest || '0'}</p>
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
                    city=  {receivedData.location || "Loading..."}
                    temperature= {receivedData.temperature ? `${receivedData.temperature} ` : "0"}
                    description={receivedData.description || "Loading..."}
                    humidity={receivedData.humidity || "Loading..."}
                    windSpeed={receivedData.windSpeed ? `${receivedData.windSpeed} km/h  ` : "0"}
                  />
                  <div className="mt-4">
                    <p className="customP7">2024 Calendar</p>
                    <Card style={{ height: "60vh", width: "100%" }}>
                    <Card.Body style={{ padding: 0, height: "100%", overflow: 'hidden' }}>
                    
                      <div style={{ height: '100%', overflow: 'auto' }}>
                      <button className="btn btn-primary " style={{marginTop:'10px',marginLeft:'10px',width: '40%',height:'8%',fontSize:'70%',borderRadius:'2px'}}  onClick={() => setShowModal(true)}>ADD PERSONAL EVENT</button>
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
                      </div>
                      </Card.Body>
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
                    const reference = selectedEvent.id;
                    deleteEvent(reference)
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



                <Modal show={errorModal} centered>
                      <Modal.Body style={{ backgroundColor: errorColor,
                       borderRadius: '0px', display: 'flex', justifyContent: 'center',
                       alignItems: 'center',flexDirection: 'column',padding: 0,}}>
                      <img src={errorIcon} alt="no internet" height="60px" width="60px" draggable={false} style={{marginBottom: "1.5em",marginTop:'2rem'}}/>
                       <p style={{color: 'black',textAlign:'center',margin:'.5rem'}}>{errorMessage}</p>
                      <div style={{display:'flex',backgroundColor:errorDiv,width:'100%',  padding: '10px',marginTop:'1em',justifyContent:'center'}}>
                      <button style={{ backgroundColor: 'transparent',border:'none',margin:'.8em',color:'white'}} onClick={()=>setShowErrorModal(false)}> DISMISS </button>
                      </div>
                      </Modal.Body>
               </Modal>


             <Modal show={showModal} onHide={handleCloseEventModal} centered dialogClassName="custom-modal wide-modal" style={{ borderRadius: '0' }}>
                            <Modal.Header style={{ background: '#0760A1', color: 'white', borderRadius: '0', border: 'none' }}>
                              <Modal.Title>Set Up Personal Event</Modal.Title>
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
                               
                                <Button  variant="danger" onClick={() =>  setShowModal(false)} style={{marginRight: '20px',width:'15%'}}>
                                  Cancel
                                </Button>
                                <Button type="submit" variant="primary" style={{width:'15%'}}>
                                  Save Event
                                </Button>
                              </Form>
                            </Modal.Body>
                          </Modal>
        </Container>
      </main>
    </>
  );
}

export default MotorpoolHomePage;
