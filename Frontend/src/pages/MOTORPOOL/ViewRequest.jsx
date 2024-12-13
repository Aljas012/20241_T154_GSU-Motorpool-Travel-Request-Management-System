import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import NavbarComponent from "../../components/NavbarComponent.jsx";
import ViewRTTModal from "../../components/ViewRTTModal.jsx";
import ViewATTModal from "../../components/ViewATTModal.jsx";
import ReactLoading from 'react-loading';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

// Add this helper function near your other utility functions
const formatTimeValue = (hour, minute, period) => {
    if (!hour && !minute) return '';
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute} ${period}`;
};

// Make sure your validateTimeInput function is also defined
const validateTimeInput = (value, max) => {
    // Allow empty value or numbers
    if (value === '' || /^\d{0,2}$/.test(value)) {
        const num = value === '' ? 0 : parseInt(value);
        return num <= max;
    }
    return false;
};

function ViewRequest() {

  const [viewRTTShow, setViewRTTModalShow] = useState(false);
  const viewRTTModalClose = () => setViewRTTModalShow(false);
  const viewRTTModalShow = () => setViewRTTModalShow(true);

  const [viewATTShow, setViewATTModalShow] = useState(false);
  const viewATTModalClose = () => setViewATTModalShow(false);
  const viewATTModalShow = () => setViewATTModalShow(true);

  /******************************************* SA SELECTION OF YEAR NI SYA ************/
  /** PARA LEGIT ANG DAYS PER MONTH / 30 OR 31 DAYS */
  const [selectedMonth, setSelectedMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [listOfAvailableVehicle, setListOfAvailableVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [listOfAvailableDrivers, setListOfAvailableDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(''); 
  const [gas_amount,setGasAmount] = useState("")
  const [verified_gas_amount,setVerifiedGasAmount] = useState("")
  const [reservation_processed_by,setReservationProcessedBy] = useState("")
  const [verified_date,setVerifiedDate] = useState("")
  const [travel_expenses,setTravelExpenses] = useState("")
  const [date_of_travel, setDateOfTravel] = useState("")
  const [travel_type,setTravelType] = useState("")
  const [pre_departure_time,setPreDepartureTime] = useState("")
  const [pre_arrival_time,setPreArrivalTime] = useState("")
  const [post_departure_date_time,setPostDepartureTime] = useState("")
  const [post_arrival_time,setPostArrivalTime] = useState("")


  const [isVehicleLoading, setIsVehicleLoading] = useState(false);
  const [isDriverLoading, setIsDriverLoading] = useState(false);
  const [value, onChange] = useState(new Date());
  const [showButtons, setShowButtons] = useState(true);

  // Add this state for calendar visibility
  const [showCalendar, setShowCalendar] = useState(false);
  const { id } = useParams();
  const [attData, setAttData] = useState(null);



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




  const availableVehicleHandler = async ()=>
      { 
        setIsVehicleLoading(true); 
        try{
          const existingVehicle = await fetch ('http://localhost:8000/admin/fetch_available_vehicles',
             {
              method:'GET',
              headers: {
                "Content-Type": "application/json",
              }
            }
          )
          const responseData = await existingVehicle.json();
          setListOfAvailableVehicles(responseData.data);
        }catch(error)
         {
          alert('error fertching data')
          console.log('Something went wrong. Unable to fetch available vehicles:', error);
        } finally {
          setIsVehicleLoading(false); // Stop loading
        }
  } 

  const availableDriverHandler = async () => {
    setIsDriverLoading(true); // Start loading
    try {
        const response = await fetch('http://localhost:8000/admin/fetch_available_drivers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        setListOfAvailableDrivers(data.data);

    } catch (error) {
        console.error('Error fetching available drivers:', error);
    } finally {
        setIsDriverLoading(false); // Stop loading
    }
};


  useEffect(() => {
    availableVehicleHandler(); // Fetch available vehicles on mount
    availableDriverHandler()
  }, []);






  const handleSelectVehicle = (vehicleName) => {
    const vehicle = listOfAvailableVehicle.find((v) => v.vehicleName === vehicleName);
    setSelectedVehicle(vehicle); 
  };


const getAdminInfo = () => {
  try {
      const adminInfo = localStorage.getItem('admin_info');
      if (!adminInfo) {
          console.log('No adminInfo found in localStorage');
          return null;
      }
      
      const parsedInfo = JSON.parse(adminInfo);
      if (!parsedInfo.name) {
          console.log('No userName found in adminInfo:', parsedInfo);
      }
      return parsedInfo;
  } catch (error) {
      console.error('Error parsing adminInfo:', error);
      return null;
  }
};



   async function fetchAttHandler(id) { 
    try {
        const response = await fetch('http://localhost:8000/admin/fetch_att_information', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reference: id })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result.success && result.data) {
            setAttData(result.data);
            console.log('ATT Data set:', result.data);
            
    
            if (result.data.travel_details) {
                setDateOfTravel(result.data.travel_details.date_travel);
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

  // Add this useEffect to log when attData changes
  useEffect(() => {
    if (attData) {
        console.log('Updated attData:', attData);
    }
  }, [attData]);



//forward to gsu head
  const saveAdminRequest = async () => {
   
    try {
        // Add validation before submission
        if (!selectedVehicle || !selectedDriver) {
            alert('Please select both vehicle and driver');
            return;
        }

        if (!verifiedBy || !verified_date) {
            alert('Please fill in verification details');
            return;
        }

        // Check time fields
        if (!pre_departure_time || !pre_arrival_time || 
            !post_departure_date_time || !post_arrival_time) {
            alert('Please fill in all time fields');
            return;
        }

        if (!selectedVehicle || !selectedDriver || !verifiedBy || !verified_date) {
            alert('Please fill in all required fields');
            return;
        }

        const data = {
          reference_id: id,  // Changed from 'id'
          assigned_vehicle: selectedVehicle?.vehicleName,  // Changed from selectedVehicle object
          plate_number: selectedVehicle?.plateNumber,  // Changed from selectedVehicle object
          driver_name: selectedDriver,
          gas_amount: gas_amount || '',
          verified_gas_amount: verified_gas_amount,
          process_confirmed_personnel: reservation_processed_by || 'Not Specified',  // Changed key name
          verified_by: verifiedBy,
          verified_date: verified_date,
          travel_expense: travel_expenses,  // Changed from travel_expenses to travel_expense
          travel_type: travel_type,
          date_of_travel: date_of_travel || '',
          pre_departure_time: pre_departure_time,
          pre_arrival_time: pre_arrival_time,
          post_departure_date_time: post_departure_date_time,
          post_arrival_time: post_arrival_time
      };


        const response = await fetch('http://localhost:8000/admin/forward_admin_request', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server validation errors:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
            alert('Successfully forwarded request');
        } else {
            throw new Error(result.message || 'Failed to forward request');
        }
    } catch(error) {
        console.error('Full error details:', error);
        alert(`Something went wrong during forwarding request: ${error.message}`);
    }
};








const adminInfo = getAdminInfo();
const userName = adminInfo?.name || ''; // Use optional chaining

// Add these states
const [verifiedBy, setVerifiedBy] = useState(userName || '');
const [isEditable, setIsEditable] = useState(false);

// Modify the handlers
const handleEditMode = () => {
  if (!verifiedBy || verifiedBy.trim() === '') {
    alert('Please set a default name first');
    return;
}
    setIsEditable(true);
    setShowButtons(true);

};

const handleConfirm = () => {

  if (isEditable) {
    // We're in edit mode, just save the current value and exit edit mode
    if (!verifiedBy.trim()) {
        alert('Please enter a name');
        return;
    }
    setIsEditable(false);
} else {
    // We're not in edit mode, this is the check button to set default value
    if (!verifiedBy || verifiedBy.trim() === '') {
        setVerifiedBy(userName);
    }
}
setShowButtons(false);
};

// Add a reset handler if you want to explicitly reset to default
const handleReset = () => {
    setVerifiedBy(userName || '');
    setIsEditable(false);
    setShowButtons(true);
};

// Add a function to handle calendar toggle
const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
};

// Add these state variables for the individual time components
const [departureHour, setDepartureHour] = useState("");
const [departureMinute, setDepartureMinute] = useState("");
const [departurePeriod, setDeparturePeriod] = useState("AM");

// Add these state variables at the top with your other states
const [arrivalHour, setArrivalHour] = useState("");
const [arrivalMinute, setArrivalMinute] = useState("");
const [arrivalPeriod, setArrivalPeriod] = useState("AM");

// Add these state variables at the top with your other states
const [postDepartureHour, setPostDepartureHour] = useState("");
const [postDepartureMinute, setPostDepartureMinute] = useState("");
const [postDeparturePeriod, setPostDeparturePeriod] = useState("AM");

// Add these state variables at the top with your other states
const [postArrivalHour, setPostArrivalHour] = useState("");
const [postArrivalMinute, setPostArrivalMinute] = useState("");
const [postArrivalPeriod, setPostArrivalPeriod] = useState("AM");



// Add proper time validation
const validateTimeInput = (value, max) => {
    if (value === '') return true;
    const num = parseInt(value);
    return !isNaN(num) && num >= 0 && num <= max;
};

// Add time formatting helper
const formatTime = (hour, minute, period) => {
    if (!hour || !minute) return '';
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${period}`;
};


const validateRequiredFields = () => {
    const required = [
        { value: selectedVehicle, name: 'Vehicle' },
        { value: selectedDriver, name: 'Driver' },
        { value: verifiedBy, name: 'Verified By' },
        { value: verified_date, name: 'Verified Date' },
        { value: travel_type, name: 'Travel Type' },
        { value: travel_expenses, name: 'Travel Expenses' }
    ];

    for (const field of required) {
        if (!field.value) {
            alert(`${field.name} is required`);
            return false;
        }
    }
    return true;
};



  return (
    <>
      <NavbarComponent />

      <main>
        <Container>
          
          <Row style={{ height: "100vh" }}>
            <Col>
              <Card className="mt-4" style={{ backgroundColor: "#f2f2f2" }}>
                <Card.Body>
                  <div>
                    <div className="lineBorderVR1">
                      <div style={{ width: "22vw" }}>
                        <a className="customA3 alignment2"
                         onClick={viewATTModalShow}
                        >
                          <h5 className="customH5Request">
                            View ATT Information
                          </h5>
                        </a>
                      </div>
                    </div>

                    <div className="lineBorderVR">
                      <div style={{ width: "22vw" }}>
                        <a
                          className="customA3 alignment2"
                          onClick={viewRTTModalShow}
                        >
                          <h5 className="customH5Request">
                            View RTT Information
                          </h5>
                        </a>
                      </div>
                    </div>

                    <div style={{ paddingLeft: ".8rem" }}>
                      <div style={{ margin: "1.5rem 0 1.5rem 0" }}>
                        <h6 className="customH6Request">
                          Motor Vehicle Reservation Details: GSU Motorpool
                          Section (Staff)
                        </h6>
                      </div>

                      <Form onSubmit={(e) => {
                          e.preventDefault();
                          saveAdminRequest();
                      }}>
                        <div className="alignVR">
                          {/** TYPE OF VEHICLE */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">Type of Vehicle:</h6>
                            </div>

                            <div>
                            <Form.Select  aria-label="Select available vehicle"
                              className="customFieldVR"
                              value={selectedVehicle ? selectedVehicle.vehicleName : ''}
                              onChange={(e) => handleSelectVehicle(e.target.value)}  >
                              {isVehicleLoading ? (
                                <option>
                                  Loading vehicles...
                                </option>
                              ) : listOfAvailableVehicle.length > 0 ? (
                                <>
                                  <option value="" disabled>Select a vehicle</option>
                                  {listOfAvailableVehicle.map((vehicle, index) => (
                                    <option key={index} value={vehicle.vehicleName}>
                                      {vehicle.vehicleName}
                                    </option>
                                  ))}
                                </>
                              ) : (
                                <option disabled > No available vehicle</option>
                              )}
                            </Form.Select>
                            </div>
                          </div>

                          {/** MOTOR VEHICLE PLATE NUMBER */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">
                                Motor Vehicle Plate Number:
                              </h6>
                            </div>

                            <div>
                            <Form.Control
                                type="text"
                                placeholder="Select vehicle to reflect plate number"
                                value={selectedVehicle ? selectedVehicle.plateNumber : ''} // Display plate number of selected vehicle
                                className="customFieldVR" 
                                readOnly  // Make it read-only so user can't edit
                              />
                                  </div>
                          </div>

                          {/** NAME & SIGNATURE OF THE DRIVER */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">
                                Name & Signature of the Driver:
                              </h6>
                            </div>

                            <div>
                            <Form.Select 
                            className="customFieldVR"
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}>
                            {isDriverLoading ? (
                              <option>
                                Loading drivers...
                              </option>
                            ) : listOfAvailableDrivers && listOfAvailableDrivers.length > 0 ? (
                                <>
                                  <option value="" disabled>Select available driver</option>
                                  {listOfAvailableDrivers.map((driver, index) => (
                                    <option key={index} value={driver.driverName}>
                                      {driver.driverName}
                                    </option>
                                  ))}
                                </>
                            ) : (
                                <option disabled>No available drivers</option>
                            )}
                        </Form.Select>
                            </div>
                          </div>

                          {/** AMOUNT GAS/DIESEL REFULED IN LITER */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">
                                Amount Gas/Diesel Refuled in Liter:
                              </h6>
                            </div>

                            <div className="alignmentRequest">
                              <Form.Control
                                type="text"
                                placeholder="Total gas refueled"
                                className="customFieldVR"
                                onChange={(e) => setGasAmount(e.target.value)}
                              ></Form.Control>
                            </div>
                          </div>

                          {/** AMOUNT OF GAS VERIFIED BY THE GAS BOY */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">
                                Amount of Gas Verified by the Gas Boy:
                              </h6>
                            </div>

                            <div>
                              <Form.Control
                                type="text"
                                placeholder="Verified Total gas refueled"
                                className="customFieldVR"
                                onChange={(e) => setVerifiedGasAmount(e.target.value)}
                              ></Form.Control>
                            </div>
                          </div>

                          {/** RESERVATION PROCESS AND CONFIRM BY */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">
                                Reservation Process and Confirm by:
                              </h6>
                            </div>

                            <div>
                              <Form.Control
                                type="text"
                                onChange={(e) => setReservationProcessedBy(e.target.value)}
                                
                                className="customFieldVR"
                              ></Form.Control>
                            </div>
                          </div>

                          {/** VERIFIED BY */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">Verified by:</h6>
                            </div>

                            <div style={{
                                justifyContent: "space-between",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Form.Control
                                    type="text"
                                    value={verifiedBy.toUpperCase()}
                                    onChange={(e) => setVerifiedBy(e.target.value)}
                                    placeholder="Please input new name"
                                    disabled={!isEditable}
                                    style={{ width: !showButtons ? "400px" : isEditable ? "285px" : "168px",border: "1px solid #000" ,textAlign:'center'}}
                                ></Form.Control>

                                {showButtons && !isEditable && (
                                    <>
                                        <Button
                                            className="customButtonVR "
                                            style={{ marginLeft: ".8rem" }}
                                            onClick={handleConfirm}
                                        >
                                            <img
                                                src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732460913/checkIcon_lgeijk.svg"
                                                alt="icon"
                                                style={{
                                                    height: "1.5rem",
                                                    width: "auto",
                                                    marginBottom: "3px",
                                                }}
                                            />
                                        </Button>
                                        <Button
                                            className="customButtonVR"
                                            style={{ marginLeft: ".8rem" }}
                                            onClick={handleEditMode}
                                         
                                        >
                                            <img
                                                src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732460913/wrongIcon_luv79g.svg"
                                                alt="icon"
                                                style={{
                                                    height: "1.5rem",
                                                    width: "auto",
                                                    marginBottom: "3px",
                                                }}
                                            />
                                        </Button>
                                    </>
                                )}
                                
                                {showButtons && isEditable && (
                                    <Button
                                        className="customButtonVR " 
                                        style={{ marginLeft: ".8rem" }}
                                        onClick={handleConfirm}
                                    >
                                        <img
                                            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732460913/checkIcon_lgeijk.svg"
                                            alt="icon"
                                            style={{
                                                height: "1.5rem",
                                                width: "auto",
                                                marginBottom: "3px",
                                            }}
                                        />
                                    </Button>
                                )}
                            </div>
                          </div>

                          {/** VERIFIED DATE */}
                          <div className="alignCenterVR">
                            <div>
                              <h6 className="noMargMHP">Verified Date:</h6>
                            </div>

                            <div className="alignCenterVRDates">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        className="customButtonVR"
                                        style={{ 
        
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '400px',
                                            padding: '6px 12px',
                                            background: 'white',
                                            border: '1px solid black',
                                            color: '#212529',
                                            position: 'relative'
                                        }}
                                        onClick={toggleCalendar}
                                    >
                                        <span style={{
                                            position: 'absolute',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: 'fit-content'
                                        }}>
                                            {value ? value.toLocaleDateString() : 'Select date'}
                                        </span>
                                       
                                    </Button>
                                </div>
                                
                                {showCalendar && (
                                    <div style={{ 
                                        position: 'absolute', 
                                        zIndex: 1000, 
                                        marginTop: '5px',
                                        background: 'white',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        borderRadius: '4px'
                                    }}>
                                        <Calendar 
                                        
                                            onChange={(date) => {
                                                onChange(date);
                                                setVerifiedDate(date.toISOString().split('T')[0]);
                                                setShowCalendar(false); // Hide calendar after selection
                                            }}
                                            value={value}
                                        />
                                    </div>
                                )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h3 className="customH3VR">Driver's Trip Tickets</h3>
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "start" }}
                        >
                          <div
                            className="alignVR1 mt-4"
                            style={{ width: "45.2rem" }}
                          >
                            {/** NAME OF DRIVER OF VEHICLE */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                  Name of Driver:
                                </h6>
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    value={selectedDriver}
                                    placeholder="Select driver to reflect name"
                                    className="customFieldVR"
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                            {/** GOVERNMENT VEHICLE TO BE USED */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                   Vehicle to be assigned:
                                </h6>
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    value={selectedVehicle ? `${selectedVehicle.vehicleName} ${selectedVehicle.plateNumber}` : ''}
                                    placeholder="Select vehicle to reflect plate number"
                                    className="customFieldVR"
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                            {/** NAME OF AUTHORIZED PASSENGER/S */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                  Name of Authorized Passenger/s:
                                </h6>
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    placeholder="Loading..."
                                    readOnly
                                    value={attData?.travel_details?.passenger_names || ''}
                                    className="customFieldVR"

                                  />
                                </div>
                              </div>
                            </div>

                            {/** PURPOSE */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">Purpose:</h6>
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    value={attData?.travel_purpose || 'Loading'}
                                    className="customFieldVR"
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                            {/** PLACE TO BE VISITED/INSPECTED */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                  Place to be Visited/Inspected:
                                </h6> 
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    
                                    value={attData?.travel_details?.destination || 'Loading'}
                                    className="customFieldVR"
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                            {/** TRAVEL CHARGEABLE AGAINST */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                Travel Expenses Chargeable to:
                                </h6>
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    placeholder="FUND 123 (CON FUND)"
                                    className="customFieldVR"
                                    onChange={(e) => setTravelExpenses(e.target.value)}
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                            {/** DATE/S TO BE USED */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                Date(s) for assignment: 
                                </h6>
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    value={attData?.travel_details?.date_travel || 'Loading'}
                                    className="customFieldVR"
                                    onChange={(e) => setTravelDate(e.target.value)}
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                            {/** TYPE OF TRAVEL */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">Type of Travel:</h6>
                              </div>

                              <div>
                                <div>
                                  <Form.Control
                                    type="text"
                                    placeholder="Specify type of travel"
                                    className="customFieldVR"
                                    onChange={(e) => setTravelType(e.target.value)}
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                        

                            {/** TIME OF DEPARTMENT FROM OFFICIAL STATION */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                  Time of Departure from Official Station:
                                </h6>
                              </div>

                              <div>
                                <div className="alignCenterVRTime">
                                  {/* HOUR */}
                                  <Form.Control
                                    type="text"
                                    placeholder="HH"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={departureHour}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 12)) {
                                            setDepartureHour(value);
                                            const newTime = formatTimeValue(
                                                value || '00',
                                                departureMinute || '00',
                                                departurePeriod
                                            );
                                            setPreDepartureTime(newTime);
                                        }
                                    }}
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
                                    type="text"
                                    placeholder="MM"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={departureMinute}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 59)) {
                                            setDepartureMinute(value);
                                            const newTime = formatTimeValue(
                                                departureHour || '00',
                                                value || '00',
                                                departurePeriod
                                            );
                                            setPreDepartureTime(newTime);
                                        }
                                    }}
                                  />
                                  {/* AM OR PM */}
                                  <Form.Select
                                    className="fieldBorder"
                                    value={departurePeriod}
                                    onChange={(e) => {
                                        setDeparturePeriod(e.target.value);
                                        const newTime = formatTimeValue(
                                            departureHour || '00',
                                            departureMinute || '00',
                                            e.target.value
                                        );
                                        setPreDepartureTime(newTime);
                                    }}
                                  >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </Form.Select>
                                </div>
                              </div>
                            </div>

                            {/** TIME OF ARRIVAL */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                  Time of Arrival as (Per line #4) above:
                                </h6>
                              </div>

                              <div>
                                <div className="alignCenterVRTime">
                                  {/* HOUR */}
                                  <Form.Control
                                    type="text"
                                    placeholder="HH"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={arrivalHour}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 12)) {
                                            setArrivalHour(value);
                                            const newTime = formatTimeValue(
                                                value || '00',
                                                arrivalMinute || '00',
                                                arrivalPeriod
                                            );
                                            setPreArrivalTime(newTime);
                                        }
                                    }}
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
                                    type="text"
                                    placeholder="MM"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={arrivalMinute}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 59)) {
                                            setArrivalMinute(value);
                                            const newTime = formatTimeValue(
                                                arrivalHour || '00',
                                                value || '00',
                                                arrivalPeriod
                                            );
                                            setPreArrivalTime(newTime);
                                        }
                                    }}
                                  />
                                  {/* AM OR PM */}
                                  <Form.Select
                                    className="fieldBorder"
                                    value={arrivalPeriod}
                                    onChange={(e) => {
                                        setArrivalPeriod(e.target.value);
                                        const newTime = formatTimeValue(
                                            arrivalHour || '00',
                                            arrivalMinute || '00',
                                            e.target.value
                                        );
                                        setPreArrivalTime(newTime);
                                    }}
                                  >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </Form.Select>
                                </div>
                              </div>
                            </div>

                            {/** DATE AND TIME OF DEPARTURE */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                  Date & Time of Departure From <br />
                                  (Per line#4) Above:
                                </h6>
                              </div>

                              <div>
                                <div className="alignCenterVRTime">
                                  {/* HOUR */}
                                  <Form.Control
                                    type="text"
                                    placeholder="HH"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={postDepartureHour}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 12)) {
                                            setPostDepartureHour(value);
                                            const newTime = formatTimeValue(
                                                value || '00',
                                                postDepartureMinute || '00',
                                                postDeparturePeriod
                                            );
                                            setPostDepartureTime(newTime);
                                        }
                                    }}
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
                                    type="text"
                                    placeholder="MM"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={postDepartureMinute}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 59)) {
                                            setPostDepartureMinute(value);
                                            const newTime = formatTimeValue(
                                                postDepartureHour || '00',
                                                value || '00',
                                                postDeparturePeriod
                                            );
                                            setPostDepartureTime(newTime);
                                        }
                                    }}
                                  />
                                  {/* AM OR PM */}
                                  <Form.Select
                                    className="fieldBorder"
                                    value={postDeparturePeriod}
                                    onChange={(e) => {
                                        setPostDeparturePeriod(e.target.value);
                                        const newTime = formatTimeValue(
                                            postDepartureHour || '00',
                                            postDepartureMinute || '00',
                                            e.target.value
                                        );
                                        setPostDepartureTime(newTime);
                                    }}
                                  >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </Form.Select>
                                </div>
                              </div>
                            </div>

                            {/** TIME ARRIVAL BACK TO OFFICIAL STATION */}
                            <div className="alignCenterVR">
                              <div>
                                <h6 className="noMargMHP">
                                  Time Arrival Back to Official Station
                                </h6>
                              </div>

                              <div>
                                <div className="alignCenterVRTime">
                                  {/* HOUR */}
                                  <Form.Control
                                    type="text"
                                    placeholder="HH"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={postArrivalHour}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 12)) {
                                            setPostArrivalHour(value);
                                            const newTime = formatTimeValue(
                                                value || '00',
                                                postArrivalMinute || '00',
                                                postArrivalPeriod
                                            );
                                            setPostArrivalTime(newTime);
                                        }
                                    }}
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
                                    type="text"
                                    placeholder="MM"
                                    className="fieldBorder"
                                    maxLength={2}
                                    value={postArrivalMinute}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateTimeInput(value, 59)) {
                                            setPostArrivalMinute(value);
                                            const newTime = formatTimeValue(
                                                postArrivalHour || '00',
                                                value || '00',
                                                postArrivalPeriod
                                            );
                                            setPostArrivalTime(newTime);
                                        }
                                    }}
                                  />
                                  {/* AM OR PM */}
                                  <Form.Select
                                    className="fieldBorder"
                                    value={postArrivalPeriod}
                                    onChange={(e) => {
                                        setPostArrivalPeriod(e.target.value);
                                        const newTime = formatTimeValue(
                                            postArrivalHour || '00',
                                            postArrivalMinute || '00',
                                            e.target.value
                                        );
                                        setPostArrivalTime(newTime);
                                    }}
                                  >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </Form.Select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="alignVR2 borderEffectVR mt-4">
                            {/** SIGNATURE OF THE PASSENGER */}
                            <div>
                              <div>
                                <h6 className="customH6DTT noMargMHP">
                                  Signatue of the Passenger
                                </h6>
                              </div>

                              <div className="mt-3">
                                <Form.Control
                               
                                  type="text"
                                  placeholder="Only when Printed"
                                   className="customFieldVR text-center"
                                  disabled
                                ></Form.Control>
                              </div>
                            </div>

                            {/** OFFICIAL DESIGNATION */}
                            <div className="mt-4">
                              <div>
                                <h6 className="customH6DTT noMargMHP">
                                  Official Designation
                                </h6>
                              </div>

                              <div className="mt-3">
                                <Form.Control
                                  type="text"
                                  placeholder="Department Head"
                                  className="customFieldVR text-center"
                                  disabled
                                ></Form.Control>
                              </div>
                            </div>

                            {/** NAME AND SIGNATURE OF THE DRIVER */}
                            <div className="mt-4 mb-3">
                              <div>
                                <h6 className="customH6DTT noMargMHP">
                                  Name and Signature of the Driver
                                </h6>
                              </div>

                              {/** MART REFLECT LANG ANG PANGALAN SA DRIVER */}
                              <div className="mt-3">
                                <Form.Control
                                  type="text"
                                  value={selectedDriver}
                                  className="customFieldVR text-center"
                                  disabled
                                ></Form.Control>
                              </div>
                            </div>

                            <div className="alignmentVR customBorder">
                              <div>
                                <div>
                                  <h6 className="customH6DTT">Prepared by:</h6>
                                </div>

                                <div>
                                  <Form.Control
                                    type="text"
                                    style={{color: 'white'}}
                                    value={verifiedBy.toUpperCase()}
                                    className="customFieldVR2 text-center "
                                    disabled
                                  ></Form.Control>
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px",
                              }}
                              className="customBorder1"
                            >
                              <Button className="customButtonVR1" type="submit">
                                Forward to GSU Head
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/** VIEW RTT MODAL */}
          <ViewRTTModal
            viewRTTModalShow={viewRTTShow}
            viewRTTModalClose={viewRTTModalClose}
          />
           <ViewATTModal 
             show={viewATTShow}
             handleClose={viewATTModalClose}
             imgUrl={attData?.imgUrl?.file_name}
             />
        </Container>
      </main>
    </>
  );
}

export default ViewRequest;
