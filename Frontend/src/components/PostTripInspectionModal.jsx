import React from 'react';
import { useEffect,useState } from 'react';
import ReactLoading from 'react-loading';
import noInternetLogo from '../ASSETS/icons8-without-internet-50.png';
import { Modal, Row, Col, Card, Form, Button, ModalBody } from 'react-bootstrap';
const PostTripInspectionModal = ({ postShow, postClose, handleMonthChange, daysInMonth, years }) => {
  const validateTimeInput = (value, max) => {
    if (value === '') return true;
    
    const num = parseInt(value);
    return !isNaN(num) && num >= 0 && num <= max;
  };

  const [waiting,setWaiting] = useState(false)
  const [noInternet,setShowNoInternet] = useState(false);
  const [data,setResponseData] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [boundTo,setBoundTo] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [driverInfo, setDriverInfo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [mileAge,setMileAge] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [timeType, setSelectedTimeType] = useState('');
  const inspectionTime = hours + ':' + minutes + ':' + timeType;



  const fetchAlldrivers = async () =>
      {
        try{
          const response  = await fetch('http://localhost:8000/admin/fetch_onduty_drivers',
            {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
              })
          
          const responseData  = await response.json();
          setResponseData(responseData);
        console.log('available data ',responseData);
        }catch(error)
          {
     
        }
  }



  const fetchDrivers = async () => {
    try {
        const response = await fetch('http://localhost:8000/admin/fetch_onduty_drivers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        const data = await response.json();
        if (data.success) {
            setDrivers(data.data);
        }
    } catch (error) {
        console.error('Error fetching drivers:', error);
       
    }
};



  function refreshInput(){
    setSelectedDriver('');
    setDriverInfo(null);
    setMileAge('');
    setBoundTo('');
    setHours('');
    setMinutes('');
    setSelectedTimeType('');
    setSelectedMonth('');
    setSelectedDay('');
    setSelectedYear('');
  }


const fetchDriverInfo = async (driverName) => {
    try {
        const response = await fetch(
            `http://localhost:8000/admin/fetch_onduty_drivers?driverName=${encodeURIComponent(driverName)}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        
        const data = await response.json();
        if (data.success && data.data.length > 0) {
            setDriverInfo(data.data[0]);
        }
    } catch (error) {
        console.error('Error fetching driver info:', error);
    }
};

useEffect(() => {
  fetchDrivers();
  fetchDriverInfo();
  fetchAlldrivers();
}, []);


const handleDriverSelect = (driverName) => {
    setSelectedDriver(driverName);
    fetchDriverInfo(driverName);
};

const handleMonthSelect = (e) => {
    setSelectedMonth(e.target.value);
};

const handleDaySelect = (e) => {
    setSelectedDay(e.target.value);
};

const handleYearSelect = (e) => {
    setSelectedYear(e.target.value);
};

const handleTimeInput = (value, setter, max) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (validateTimeInput(numericValue, max)) {
      setter(numericValue);
    }
  };

const isTimeValid = () => {
  const hour = parseInt(hours);
  const minute = parseInt(minutes);
  return (
    hour >= 1 && 
    hour <= 12 && 
    minute >= 0 && 
    minute <= 59 && 
    timeType !== ''
  );
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const exportPdfHandler = async (e) => {
    e.preventDefault();
    if (!isTimeValid()) {
      alert('Please enter a valid time');
      return;
    }
    setShowNoInternet(false);
    setWaiting(true)
    try {
        console.log('Starting PDF generation...');
        const data = {
          driverName: selectedDriver,
          vehicle: driverInfo.assigned_vehicle, mileAge,boundTo, 
          inspectionDate: {month: selectedMonth, day: selectedDay, year: selectedYear },
          dateOfTravel: formatDate(driverInfo.date_of_travel),
          inspectionTime: inspectionTime,
          verified_by: driverInfo.verified_by
        };
      
        const response = await fetch('http://localhost:8000/admin/inspection_list_generate_pdf', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });


        if (!response.ok) {
          const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${data.message || 'Unknown error'}`);
        }
        setShowNoInternet(false);
        setWaiting(false)
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        console.log("PDF generated successfully. Redirecting to the PDF...");

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Post trip inspection.pdf"; 
        document.body.appendChild(link); 
        link.click();

        document.body.removeChild(link); 
        URL.revokeObjectURL(pdfUrl);
        refreshInput();
    } catch (error) {
        console.error('Full error details:', error);
        setShowNoInternet(true);
        setWaiting(false)
    }
};



  return (
    <>
    <Modal show={postShow} onHide={postClose} size="xl" >
      <Modal.Header closeButton>
        <Modal.Title
          style={{

            fontSize: '1.7rem',
            fontWeight: 'bold',
            color: '#CD8800',

          }}
        >
          Pre and Post - Trip Inspection Checklist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: '#F1F1F1' }}>
              <Row>
                {/* LEFT SIDE */}
                <Col>
                  <div className="alignTIC p-4" style={{ borderRight: '1px solid #00000066' }}>
                    <Form>
                      {/* INSPECTED BY */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP ">Inspected by:</h6>
                        <Form.Control type="text" placeholder="Select Driver to fill" disabled value={driverInfo?.verified_by || ''} className="customFieldTIC" style={{borderTop: 'none',borderLeft: 'none',borderRight: 'none',borderRadius: '0',backgroundColor: '#F1F1F1'}} />
                      </div>

                      {/* DRIVER */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Driver:</h6>
                        <Form.Select
                            value={selectedDriver}
                            onChange={(e) => handleDriverSelect(e.target.value)}
                            className="customFieldTIC"
                        >
                            <option value="">Select Driver</option>
                            {drivers.map((driver, index) => (
                                <option key={index} value={driver.driver_name.toUpperCase()}>
                                    {driver.driver_name}
                                </option>
                            ))}
                        </Form.Select>
                      </div>

                      {/* VEHICLE */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Vehicle:</h6>
                        <Form.Control
                            type="text"
                            value={driverInfo?.assigned_vehicle.toUpperCase() || ''}
                            readOnly
                            placeholder="Select Driver to fill"
                            className="customFieldTIC"
                            style={{borderTop: 'none',borderLeft: 'none',borderRight: 'none',borderRadius: '0',backgroundColor: '#F1F1F1'}}
                        />
                      </div>

                      {/* CURRENT MILEAGE */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Current Milage:</h6>
                        <Form.Control 
                            type="text"  
                            className="customFieldTIC" 
                            value={mileAge} 
                            onChange={(e)=>setMileAge(e.target.value)}
                        />
                      </div>

                      {/* BOUND TO */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Bound to:</h6>
                        <Form.Control onChange={(e)=>setBoundTo(e.target.value)} value={boundTo} type="text"  className="customFieldTIC" />
                      </div>

                      {/* TIME OF INSPECTION */}
                      <div className="alignCenterTIC2 ">
                        <h6 className="noMargMHP mb-2">Time of Inspection:</h6>
                        <div className="alignCenterTIC1 ">
                        <Form.Control
                          type="text"
                          className="fieldBorder"
                          value={hours}
                          onChange={(e) => handleTimeInput(e.target.value, setHours, 12)}
                          style={{ textAlign: 'center' }}
                          placeholder="HH"
                          maxLength={2}
                        />
                        :
                        <Form.Control
                          type="text"
                          className="fieldBorder"
                          value={minutes}
                          onChange={(e) => handleTimeInput(e.target.value, setMinutes, 59)}
                          style={{ textAlign: 'center' }}
                          placeholder="MM"
                          maxLength={2}
                        />
                        :
                        <Form.Select
                          value={timeType}
                          onChange={(e) => setSelectedTimeType(e.target.value)}
                          className="fieldBorder"
                        >
                          <option value="">Select</option>
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </Form.Select>
                        </div>
                      </div>

                      {/* DATE OF INSPECTION */}
                      <div className="alignCenterTIC2">
                        <h6 className="noMargMHP mb-2">Date of Inspection:</h6>
                        <div className="alignCenterTIC1">
                          <Form.Select
                            id="month"
                            value={selectedMonth}
                            onChange={handleMonthSelect}
                            className="fieldBorder"
                          >
                            <option value="">Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                          </Form.Select>

                          <Form.Select 
                            id="day"
                            value={selectedDay}
                            onChange={handleDaySelect}
                            className="fieldBorder"
                          >
                            <option value="">Day</option>
                            {[...Array(daysInMonth)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </Form.Select>

                          <Form.Select 
                            id="MART"
                            value={selectedYear}
                            onChange={handleYearSelect}
                            className="fieldBorder"
                          >
                            <option value="">Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>

                      {/* DATE OF TRAVEL */}
                      <div className="alignCenterTIC2">
                        <h6 className="noMargMHP mb-2">Date of Travel:</h6>
                        <div className="alignCenterTIC1">
                          

                          <Form.Control  className="fieldBorder"
                          value={driverInfo?.date_of_travel || ''}
                          disabled
                          placeholder="Select Driver to fill"
                        style={{borderTop: 'none',borderLeft: 'none',borderRight: 'none',borderRadius: '0',backgroundColor: '#F1F1F1'}}
                          />
                        </div>
                      </div>

                      <div className="alignment1 mt-2">
                        <Button onClick={exportPdfHandler} className="customButonMHP">
                          Download PDF
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>

                {/* RIGHT SIDE */}
                <Col>
                  <div className="scrollableDiv1 p-4">
                    <div className="alignment1">
                      <h6 className="customFont3 mb-1">THINGS TO CHECK</h6>
                    </div>

                    {/* DOCUMENTS */}
                    <div>
                      <h6 className="customFont2">Documents</h6>
                      <p className="noMargMHP">Duly Signed Trip Ticket</p>
                      <p className="noMargMHP">Drivers Licencse</p>
                      <p className="noMargMHP">Photocopy of Vehicle OR/CR</p>
                    </div>

                    {/* VEHICLE ITEMS */}
                    <div>
                      <h6 className="customFont2">Vehicle Items</h6>
                      <div className="scrollableDiv">
                        <p className="noMargMHP">Brake</p>
                        <p className="noMargMHP">Head Lamp</p>
                        <p className="noMargMHP">Tail and Signal Light</p>
                        <p className="noMargMHP">Brake Light</p>
                        <p className="noMargMHP">Horn</p>
                        <p className="noMargMHP">
                          Fluid Levels (Oil, Water, Transmission Fluid)
                        </p>
                        <p className="noMargMHP">Windshield Including Wiper</p>
                        <p className="noMargMHP">Side Mirrors</p>
                        <p className="noMargMHP">Drum Bolts</p>
                        <p className="noMargMHP">Tire Thickness</p>
                        <p className="noMargMHP">Tire Pressure</p>
                      </div>
                    </div>

                    {/* ADDITIONAL */}
                    <div>
                      <h6 className="customFont2">Additional</h6>
                      <div className="scrollableDiv">
                        <p className="noMargMHP">First Aid Kit</p>
                        <p className="noMargMHP">Fire Extinguisher</p>
                        <p className="noMargMHP">Flashlight</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>

    <Modal show={waiting} centered size="sm" animation={true}>
      <ModalBody
        style={{
          backgroundColor: '#FEFEFF',
          borderRadius: '0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <ReactLoading
          type="bubbles"
          color="blue"
          height={80}
          width={80}
        />
        <p style={{color:'black',fontSize:'.8rem',textAlign:'center'}}>Please wait while we are processing your request.</p>
      </ModalBody>
    </Modal>
    
    <Modal show={noInternet} centered size="sm" animation={true}>
      <ModalBody
        style={{
          backgroundColor: '#FFC400',
          borderRadius: '0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={noInternetLogo} alt="no internet" height="50px" width="50px" draggable={false} style={{marginBottom: "10px"}}/>
        <p style={{color:'black',fontSize:'.8rem',textAlign:'center'}}>Something went wrong! please check your internet connection.</p> <button onClick={exportPdfHandler} style={{border:"none",backgroundColor:"#FFC400",color: "red",fontSize:".8rem"}}>Try again</button>
      </ModalBody>
    </Modal>
    </>
  );
};

export default PostTripInspectionModal;
