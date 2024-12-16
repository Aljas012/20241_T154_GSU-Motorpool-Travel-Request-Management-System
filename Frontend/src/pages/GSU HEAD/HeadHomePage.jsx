import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card,Modal,Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../STYLES/MotorpoolHomePage.css";
import HeadNavbar from "../../components/HeadNavbar";
import HeadSidebarComponent from "../../components/HeadSideBar";
import WeatherInfo from "../../components/WeatherInfoComponent";
import MotorpoolApprovedModal from "../../components/MotorpoolApprovedModal";
import '../../styles/Calendar.css'; 
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
function HeadHomePage() {
  /** REQUEST MODAL FUNC */
  const [requestShow, setRequestModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showEventModal, setShowEventModal] = useState(false);

      const handleCloseEventModal = () => { setShowEventModal(false);setSelectedEvent(null);};
    const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const requestClose = () => setRequestModalShow(false);
  const requestModalShow = () => setRequestModalShow(true);
  const [data,setData] = useState([])
  const [headApproved,setheadApproved] = useState('')
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


  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };



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
fetchEvents()
  },[])

 

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
  const fetchedApprovedRequest = async () => {
    const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
    const token = adminInfo.admin_token;
        try{
          const response = await fetch('http://localhost:8000/admin/fetched_approved_request',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }})

            if(!response.ok)
            {
              console.log('cannot fetch data.')
              return;
            }
            const responseData = await response.json()
            console.log(responseData)
            setData(responseData.data)
        }catch(error)
        {
          setShowErrorModal(true)     
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
          setErrorColor('white')
          setErrorDiv(danger)
          setErrorMessage('Something went wrong. Please check your internet connection.')
        }
  }
  fetchedApprovedRequest()
},[])



useEffect(() => {

    const fetchHeadApprovedTravels = async () =>{ //mao ni ang gi approved na sa heads
      const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
      const token = adminInfo.admin_token;
      try{
          const getApproved = await fetch('http://localhost:8000/admin/head_approved_request',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }})
            if(!getApproved.ok){
              
              return;
            }
            const receivedData = await getApproved.json()
            console.log(receivedData)
            setheadApproved(receivedData)
      }catch(error){
        alert(error)
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
      }
    }
    fetchHeadApprovedTravels()
  },[])



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


  const columns = [
    {
      name: "Requestor",
      selector: (row) => row.user?.requestor_name,
    },
    {
      name: "Date of Request",
       selector: (row) => {
      const [month, day, year] = row.date_of_travel.split(" ");
      const date = new Date(`${month} ${day}, ${year}`); // Convert to a Date object
      return date.toLocaleDateString('en-US', {
        month: 'long',  
        day: 'numeric',
        year: 'numeric', 
      });
    }},
    {
      name: "Time of Approval",
      selector: (row) => {
        const time = new Date(row.updatedAt).toLocaleTimeString('en-US', { hour12: true });
        return time;
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color:
              row.status === "Approved"
                ? "green"
                : row.status === "Pending"
                ? "orange"
                : "red",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      ),
    },
  ];


  return (
    <>
      {/** HEADER */}

      <HeadNavbar username="GSU Head" />


      <main>

        
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



        <Container fluid>
          <Row className="customRow p-0">
            {/** SIDEBAR */}
            <HeadSidebarComponent requestModalShow={requestModalShow} />

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
                      Good Day, GSU Head
                    </h5>
                  </div>
                </Card>

                <div className="mt-4">
                  <Card className="headCustomCard">
                    <Card.Header>List of Approved Travels</Card.Header>
                    <Card.Body>
                      <div>
                        <DataTable
                          columns={columns}
                          data={headApproved}
                          customStyles={customStyles}
                          highlightOnHover
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Col>



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
              
            </Modal.Footer>
          </Modal>




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
                  <div className="mt-6">
                    <p className="customP7">2024 Calendar</p>
                      <Card style={{ height: "50vh", width: "100%" }}>
                        <Card.Body>

                          <Calendar localizer={localizer} events={calendarEvents}
                               startAccessor="start" endAccessor="end"
                            style={{ height: '100%' }}
                               onSelectEvent={handleSelectEvent}
                                views={['month', 'week', 'day']}
                                defaultView="month"
                                 tooltipAccessor={event => event.desc}
                                components={{ month: {
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

                        </Card.Body>
                      </Card>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/** REQUEST MODAL */}
          <MotorpoolApprovedModal
            requestShow={requestShow}
            requestClose={requestClose}
            customStyles={customStyles}
          />
        </Container>
      </main>
    </>
  );
}

export default HeadHomePage;
