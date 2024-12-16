import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Modal, Row, Col, Card, Form } from "react-bootstrap";

const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const [month, day, year] = dateString.split(' ');
        
        // Check if month is between 1-12
        if (month < 1 || month > 12) {
            return 'Invalid date';
        }
        
        const date = new Date(year, month - 1, day);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (error) {
        console.error('Error parsing date:', error);
        return 'Invalid date';
    }
};

const ViewRTTModal = ({ viewRTTModalShow, viewRTTModalClose }) => {
  /******************************************* SA SELECTION OF YEAR NI SYA ************/
  /** PARA LEGIT ANG DAYS PER MONTH / 30 OR 31 DAYS */
  const [selectedMonth, setSelectedMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [rttData, setRttData] = useState("");
  const [requestHour, setRequestHour] = useState('');
  const [requestMinute, setRequestMinute] = useState('');
  const [requestPeriod, setRequestPeriod] = useState('');
  const [departureHour, setDepartureHour] = useState('');
  const [departureMinute, setDepartureMinute] = useState('');
  const [departurePeriod, setDeparturePeriod] = useState('');
  const [arrivalHour, setArrivalHour] = useState('');
const [arrivalMinute, setArrivalMinute] = useState('');
const [arrivalPeriod, setArrivalPeriod] = useState('');
const [returnHour, setReturnHour] = useState('');
const [returnMinute, setReturnMinute] = useState('');
const [returnPeriod, setReturnPeriod] = useState('');

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

  const { id } = useParams();
  async function fetchAttHandler(id) { 
    const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
    const token = adminInfo.admin_token;
    try {
        const response = await fetch('http://localhost:8000/admin/fetch_att_information', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ reference: id })
        });
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        const result = await response.json();
        
        if (result.success && result.data) {
            setRttData(result.data);
            console.log('ATT Data set Modal:', result.data);
            
    
            if (result.data.travel_details) {
           
                console.log('Travel details Modal:', result.data.travel_details);
            }
        } else {
            throw new Error(result.message || 'No data received');
        }
        
    } catch(error) {
        console.error('Error in fetchAttHandler:', error);
        alert(`Failed to fetch request details: ${error.message}`);
    }
}
useEffect(() => {
  if (id) {  
    fetchAttHandler(id);
  }
}, [id]);

useEffect(() => {
    if (rttData?.request_time) {
        // Assuming format is "HH:MM AM" or "HH:MM PM"
        const timeString = rttData.request_time;
        
        // Split into time and period
        const [time, period] = timeString.split(' ');
        
        // Split time into hours and minutes
        const [hour, minute] = time.split(':');
        
        setRequestHour(hour || '');
        setRequestMinute(minute || '');
        setRequestPeriod(period || 'AM');
    }

    if (rttData?.travel_details?.departure_time) {
      // Assuming format is "HH:MM AM" or "HH:MM PM"
      const timeString = rttData.travel_details.departure_time;
      
      // Split into time and period
      const [time, period] = timeString.split(' ');
      
      // Split time into hours and minutes
      const [hour, minute] = time.split(':');
      
      setDepartureHour(hour || '');
      setDepartureMinute(minute || '');
      setDeparturePeriod(period || 'AM');
  }
  if (rttData?.travel_details?.arrival_time) {
    // Assuming format is "HH:MM AM" or "HH:MM PM"
    const timeString = rttData.travel_details.arrival_time;
    
    // Split into time and period
    const [time, period] = timeString.split(' ');
    
    // Split time into hours and minutes
    const [hour, minute] = time.split(':');
    
    setArrivalHour(hour || '');
    setArrivalMinute(minute || '');
    setArrivalPeriod(period || 'AM');
}
if (rttData?.travel_details?.return_arrival_time) {
    // Format is "HH MM PP" (e.g., "11 45 AM")
    const [hour, minute, period] = rttData.travel_details.return_arrival_time.split(' ');
    
    setReturnHour(hour || '');
    setReturnMinute(minute || '');
    setReturnPeriod(period || 'AM');
}
}, [rttData]);

  return (
    <Modal
      show={viewRTTModalShow} // Correct state usage
      onHide={viewRTTModalClose} // Correct handler for closing the modal
      size="xl"
  
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            color: "#CD8800",
          }}
        >
        
          Request To Travel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card
              style={{
                backgroundColor: "#F1F1F1",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              <Card.Body>
                <Col>
           
                  <div className="alignmentVRTT">
                    {/** NAME OF THE REQUESTOR */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Name of the Requestor:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">{rttData.requestor_name || 'No data available'}</p>
                    </div>

                    {/** OFFICE/DEPARTMENT/UNIT NAME OF ORGANIZATION */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Office/Department/Unit Name of Organization:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                        {rttData.collegeName}
                      </p>
                    </div>

                    {/** CONTACT NUMBER */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Contact Number:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">{rttData.contact_number || 'No data available'}</p>
                    </div>

                    <div className="borderEffectVRTT">
                      <h6 className="noMargMHP customH6VRTT">
                        Date of Request
                      </h6>
                    </div>

                    {/** DATE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Date:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRDates">
                        <Form.Control
                        disabled
                       style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                       value={rttData.request_date || 'No data available'}
                        />

                        
                      </div>
                    </div>

                    {/** TIME */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Time:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRTime">
                        {/* HOUR */}
                        <Form.Control
                          disabled
                          value={requestHour || 'No data available'}
                          style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                        />
                        <span
                          style={{
                            marginRight: "2px",
                            marginLeft: "2px",
                            fontWeight: "700",
                          }}
                        >
                          :
                        </span>
                        {/* MINUTE */}
                        <Form.Control
                        disabled
                        value={requestMinute || 'No data available'}
                        style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                        />
                        {/* AM OR PM */}
                        <Form.Control
                        disabled
                        value={requestPeriod || 'No data available'}
                        style={{border:"none",backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                        />
                      </div>
                    </div>

                    <div className="borderEffectVRTT">
                      <h6 className="noMargMHP customH6VRTT">Travel Details</h6>
                    </div>

                    {/** DATE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Date:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRDates">
                       <Form.Control
                       disabled
                       value={rttData.travel_details ? formatDate(rttData.travel_details.date_travel) : 'No data available'}
                       style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                       />
                      </div>
                    </div>

                    {/** DESTINATION */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Destination:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                       {rttData.travel_details ? rttData.travel_details.destination : 'No data available'}
                      </p>
                    </div>

                    {/** NAME OF PASSENGER/S */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Name of Passenger/s:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                     {rttData.travel_details ? rttData.travel_details.passenger_names : 'No data available'}
                      </p>
                    </div>

                    <div className="alignmentTimeVRTT3">
                      {/** LEFT SIDE */}
                      <div>
                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-3">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">
                              Expected Departure Time:
                            </p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                            <Form.Control
                              style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={departureHour}
                              className="customControlVRTT"
                            />
                            <span className="customSemic">:</span>
                            <Form.Control
                               style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={departureMinute }
                              className="customControlVRTT"
                            />
                            <Form.Control
                              style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={departurePeriod }
                              className="customControlVRTT"
                            />
                          </div>
                        </div>

                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-1">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">Expected Arrival Time:</p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                            <Form.Control
                              style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={arrivalHour}
                              className="customControlVRTT"
                            />
                            <span className="customSemic">:</span>
                            <Form.Control
                              style={{border:"none",backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={arrivalMinute }
                              className="customControlVRTT"
                            />
                            <Form.Control
                               style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={arrivalPeriod }
                              className="customControlVRTT"
                            />
                          </div>
                        </div>
                      </div>

                      {/** RIGHT SIDE */}
                      <div>
                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-3">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">Expected Return Date:</p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                          <Form.Control
                        disabled
                       style={{border:"none",backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                       value={rttData.travel_details ? formatDate(rttData.travel_details.return_date) : '' || 'No data available'}
                        />

                          </div>
                        </div>

                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-1">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">Expected Return Time:</p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                            <Form.Control
                              style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={returnHour }
                              className="customControlVRTT"
                            />
                            <span className="customSemic">:</span>
                            <Form.Control
                               style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={returnMinute }
                              className="customControlVRTT"
                            />
                            <Form.Control
                               style={{border:"none", backgroundColor: "#F1F1F1",borderRadius:"0",borderBottom:"0.1px solid gray",textAlign:"center"}}
                              disabled
                              value={returnPeriod }
                              className="customControlVRTT"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** PURPOSE OF TRAVEL */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Purpose of Travel:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                        <div
                          style={{
                            maxWidth: "100%",
                            marginLeft: "auto",
                            textAlign: "left",
                          }}
                        >
                        {rttData.travel_purpose || 'No data available'}
                        </div>
                      </p>
                    </div>
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ViewRTTModal;
