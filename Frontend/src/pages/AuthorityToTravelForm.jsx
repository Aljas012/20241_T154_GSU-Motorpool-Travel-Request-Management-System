import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
//const generatePdf = require('')
import ATTNav from "../components/ATT_Nav";
//  import PdfGenerator from './middleware/wordGenerator'; // adjust the path based on your file structure
  import "../styles/AuthorityToTravelForm.css";

  function AuthorityToTravelForm({ children }) {
    const navigate = useNavigate();
    


    const   [name,setName] = useState("");
    const   [auth_travel_number,setAuthTravelNumber] = useState("")
    const   [position,setPosition] = useState("")
    const   [station,setStation] = useState("")
    const   [purpose_travel,setTravelPurpose] = useState("")
    const   [destination,setDestination] = useState("")
    const   [travel_time_period,setTravelTimePeriod] = useState("") 
    const   [fundSource,setFundSource] = useState("")
    const   [chair_person_name, setChairpersonName] = useState("")
    const   [dean_name, setDeanName] = useState("")
    const   [vpaa_name, setVpaaName] = useState("")
    const   [checkedWithVehicle, setCheckedWithVehicle] = useState(false);
    const   [checkedWithoutVehicle, setCheckedWithoutVehicle] = useState(false);
    const   [request_date, setRequestDate] = useState(new Date());
    const   [isCalendarVisible, setIsCalendarVisible] = useState(false);
  

    const handleBackButton = () => {
      const userInfo = JSON.parse(localStorage.getItem("user_info")); // Parse the stored JSON
      const id = userInfo.user_id; // Access the correct key for the user ID
      navigate(`/user/id=${id}/homepage`);
    };


    const toggleCalendar = () => {
      setIsCalendarVisible(prevState => !prevState);
    };

    const handleDateChange = (date) => {
     
      setRequestDate(new Date(date)); // Set the selected date
      setIsCalendarVisible(false); // Close the calendar
    };

    const formattedDate = request_date
    ? request_date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',  // Abbreviated month (e.g., Jan, Feb)
        day: 'numeric',  // Day of the month
      })
    : "Select a Date";  // Default placeholder if no date is selected



    // Handle checkbox click
    const handleCheckboxChange = (event) => {
      const { id } = event.target;
      
      if (id === "withGovernmentVehicle") {
        // If the "withVehicle" checkbox is checked, set it to true and "withoutVehicle" to false
        setCheckedWithVehicle(!checkedWithVehicle);
        if (!checkedWithVehicle) {
          setCheckedWithoutVehicle(false);
        }
      } else if (id === "withoutGovernmentVehicle") {
        // If the "withoutVehicle" checkbox is checked, set it to true and "withVehicle" to false
        setCheckedWithoutVehicle(!checkedWithoutVehicle);
        if (!checkedWithoutVehicle) {
          setCheckedWithVehicle(false);
        }
      }
    };
    
    const use_vehicle = checkedWithVehicle ? "true" : checkedWithoutVehicle ? "false" : undefined;


    const handleClickh6 = () => {
      alert("H6 clicked!"); // You can replace this with any action you want
    };
    
  const currentYear = new Date().getFullYear(); // Get the current year
  const startYear = 2023; // Define the starting year
  const years = []; // Initialize an array to hold the years

  // Populate the years array with the range of years
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const userId = userInfo?.user_id;

  const formDataHandler = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way
  
    // Fetch token and user info from localStorage
    const token = localStorage.getItem("auth_token");

    const data = { name,position,purpose_travel,station, request_date,destination,
      fundSource, travel_time_period, auth_travel_number,checkedWithVehicle, checkedWithoutVehicle,chair_person_name,
      dean_name,vpaa_name, userId};
  
    console.log(JSON.stringify(request_date));

    try {
      // Make the API call to generate the PDF
      const response = await fetch(
        `http://localhost:8000/user/${userId}/authority_to_travel/generate_pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data), 
        }
      );
  
      if (response.ok) {
    
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
  
        console.log("PDF generated successfully. Redirecting to the PDF...");

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "AuthorityToTravel.pdf";
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 
        await saveToDatabase();
      } else {
        // Handle errors from the server
        const result = await response.json();
        console.error("Error:", result.error || result.message);
        alert(`Error generating PDF: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      // Catch and log any errors
      console.error("Error:", error);
    }
  };

  const displayDate = request_date || "Select a Date";


  const saveToDatabase = async () =>
          {

 
     const data = {name, position, purpose_travel,  station, destination,
      fundSource,request_date,travel_time_period,auth_travel_number, use_vehicle, chair_person_name,
      dean_name, vpaa_name,userId };


        
      console.log('data that will be sent to backend',data)
      console.log('the id that will be sent to backend is ',userId)
      try{
          const response  = await fetch('http://localhost:8000/user/save_data',{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data), // Ensure `data` is serializable
          })
              if(!response.ok)
                  {
                console.log('there is an error in the backend that causes an error')
              }
      }catch(error)
        {
          
        }
      }
  
  return (
    <>
      <ATTNav></ATTNav>

      {/** BODY */}
      <main>
        <Container>
          <Row>
            <Col>
              <div>
                {/** BACK BUTTON */}
                <button
                  onClick={handleBackButton}
                  style={{
                    backgroundColor: "#0760A1", // Blue background color for the button
                    color: "#FFFFFF", // Text color (icon color will inherit this)
                    cursor: "pointer", // Change cursor to pointer to indicate clickability
                    display: "flex", // Use flex to center the icon
                    alignItems: "center", // Center vertically
                    justifyContent: "center", // Center horizontally
                    border: "none", // Remove border
                    borderRadius: "4px", // Optional: Rounded corners
                    width: "3rem",
                    height: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft} // Use the left arrow icon
                    style={{ color: "#FFFFFF", width: "28px", height: "auto" }} // Set icon color to white
                  />
                </button>
              </div>

              <div>
                        <Card
                          style={{
                            marginTop: "1rem",
                            paddingBottom: "1rem",
                            marginBottom: "3rem",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          <Card.Header>
                            <h6
                              style={{
                                color: "#0760A1",
                                fontFamily: "Helvetica",
                                fontWeight: "500",
                                marginBottom: "0",
                              }}
                            >
                              ATT
                            </h6>
                          </Card.Header>

                          <Card.Body
                            style={{
                              display: "flex",
                              alignItems: "stretch",
                            }}
                          >
                            {/* FIRST COLUMN */}
                            <Col md={7}>
                              {/* CARD.BODY LEFT SIDE */}
                              <div style={{ flex: 1, padding: "1rem" }}>
                                <Container>
                                <Form id="ATT_form" onSubmit={formDataHandler}>
      {/* DATE OF TRAVEL */}

                            
      
    
      <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
      <Container>
        <Form id="ATT_form">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <img
              src="../images/CALENDAR_ICON.png"
              alt="Calendar"
              style={{
                width: "auto",
                height: "2rem",
                marginRight: "1rem",
              }}
            />
            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>Date of travel:</h6>

            <div style={{ display: "flex", flexDirection: "column", marginLeft: "2rem" }}>
              {/* Button to toggle calendar */}
              <Button
                onClick={toggleCalendar}
                variant="outline-secondary"
                style={{
                  width: "22rem",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  marginLeft: "3.6rem",
                }}
              >
                 {formattedDate}  {/* If no date is selected, show "Select a Date" */}
              </Button>
            </div>
          </div>

          {/* Floating Calendar */}
          {isCalendarVisible && (
            <div
              style={{
                position: "absolute", // Make it float
                top: "4rem", // Position it below the button
                left: "50%", // Center it horizontally
                transform: "translateX(-50%)", // Adjust for centering
                zIndex: 10, // Ensure it's above other elements
                backgroundColor: "#fff", // Background color for visibility
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <Calendar
                onChange={handleDateChange}
                value={new Date(request_date)} // Pass selected date to Calendar component
              />
            </div>
          )}
        </Form>
      </Container>
    </div>
  




                            {/* NAME OF THE REQUESTOR*/}
                            <div  style={{ display: "flex",  alignItems: "center",  marginTop: "1rem",}} >
                              <img
                                src="../images/REQUESTOR_ICON.png"
                                alt="Requestor"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Name of the Requestor:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="name"
                                type="text"
                                placeholder="Full Name"
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "2rem",
                                }}
                              />
                            </div>

                            {/* POSITION / DESIGNATION */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/POSITION_ICON.png"
                                alt="Position"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Position/Designation:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="role"
                                type="text"
                                placeholder="Role"
                                onChange={(e) => setPosition(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "3.3rem",
                                }}
                              />
                            </div>

                            {/* OFFICIAL STATION */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/STATION_ICON.png"
                                alt="Station"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Official Station:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="office"
                                type="text"
                                placeholder="Office"
                                onChange={(e) => setStation(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "6rem",
                                }}
                              />
                            </div>

                            {/* PURPOSE OF TRAVEL */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/PURPOSE_ICON.png"
                                alt="Purpose"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Purpose of Travel:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="description"
                                type="text"
                                placeholder="Description"
                                onChange={(e) => setTravelPurpose(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "4.7rem",
                                }}
                              />
                            </div>

                            {/* DESTINATION */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/DESTINATION_ICON.png"
                                alt="Purpose"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Destination:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="destination"
                                type="text"
                                placeholder="Location"
                                onChange={(e) => setDestination(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "7.6rem",
                                }}
                              />
                            </div>

                            {/* PERIOD COVERED */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/TIME_ICON.png"
                                alt="Purpose"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Period Covered
                                <br />
                                <span style={{ fontSize: "0.8rem" }}>
                                  (Inclusive Travel of Time)
                                </span>
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="travel_time"
                                type="text"
                                placeholder="Optional"
                                onChange={(e) => setTravelTimePeriod(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "4rem",
                                }}
                              />
                            </div>

                            {/* FUND SOURCE */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/FUND_ICON.png"
                                alt="Purpose"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Fund Source:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="fund_source"
                                type="text"
                                placeholder="Optional"
                                onChange={(e) => setFundSource(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "6.9rem",
                                }}
                              />
                            </div>

                            {/* ATT NUMBER */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/ATTNO_ICON.png"
                                alt="NUMBER"
                                style={{
                                  width: "auto",
                                  height: "2rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Authority To Travel No:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                id="att_no."
                                type="text"
                                placeholder="No."
                                onChange={(e) => setAuthTravelNumber(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "2.9rem",
                                }}
                              />
                            </div>

                            {/* USE OF VEHICLE */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <img
                                src="../images/USEVEHIC_ICON.png"
                                alt="Purpose"
                                style={{
                                  width: "auto",
                                  height: "1.4rem",
                                  marginRight: "1rem",
                                }}
                              />
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Use of Vehicle:
                              </h6>

                              {/* Checkboxes aligned horizontally with the heading */}
                              <div
                                style={{
                                  display: "flex",
                                  marginLeft: "6.5rem",
                                }}
                              >
                                <Form.Check
                                    type="checkbox"
                                    id="withGovernmentVehicle"
                                    label={
                                      <span style={{ fontSize: "12px" }}>
                                        With Government Vehicle
                                      </span>
                                    }
                                    className="custom-checkbox"
                                    style={{ marginRight: "1rem" }} // Add spacing between checkboxes
                                    checked={checkedWithVehicle} // Checked if the state matches
                                    onChange={handleCheckboxChange} // Handle state change
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    id="withoutGovernmentVehicle"
                                    label={
                                      <span style={{ fontSize: "12px" }}>
                                        Without Government Vehicle
                                      </span>
                                    }
                                    className="custom-checkbox"
                                    checked={checkedWithoutVehicle}// Checked if the state matches
                                    onChange={handleCheckboxChange} // Handle state change
                                  />
                                </div>
                              </div>
                            </Form>
                        </Container>
                      </div>
                    </Col>

                    {/* SECOND COLUMN */}
                    <Col md={5}>
                      {/** CARD.BODY RIGHT SIDE */}
                      <Container style={{ marginTop: "1rem" }}>
                        <div>
                          <h4
                            style={{
                              fontFamily: "Helvetica",
                              fontWeight: "700",
                            }}
                          >
                            Recommending Approval:
                          </h4>

                          {/** CHAIRPERSON */}
                          <div style={{ marginTop: "1.4rem" }}>
                            <Form id="approval">
                              <Form.Group
                                className="mb-3"
                                controlId="name"
                                onChange={(e) => setChairpersonName(e.target.value)}
                                style={{
                                  width: "20rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                              >
                                {/** INPUT FIELD */}
                                <Form.Control
                                  type="text"
                                  placeholder="Please input the name"
                                />
                              </Form.Group>
                            </Form>

                            <h6
                              style={{
                                fontFamily: "Helvetica",
                                fontWeight: "600",
                              }}
                            >
                              CHAIRPERSON-COLLEGE OF TECHNOLOGY
                            </h6>
                          </div>

                          {/** OTHERS? PLEASE SPECIFY */}
                          <h6
                            onClick={handleClickh6}
                            style={{
                              color: "#0760A1",
                              fontFamily: "Helvetica",
                              fontWeight: "500",
                              cursor: "pointer",
                            }}
                          >
                            Others? Please Specify
                          </h6>

                          {/** DEAN/UNIT HEAD */}
                          <div style={{ marginTop: "2rem" }}>
                            <Form id="others">
                              <Form.Group
                                className="mb-3"
                                controlId="name"
                                onChange={(e) => setDeanName(e.target.value)}
                                style={{
                                  width: "20rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                              >
                                {/** INPUT FIELD */}
                                <Form.Control
                                  type="text"
                                  placeholder="Name of the Dean/UH"
                                />
                              </Form.Group>
                            </Form>

                            <h6
                              style={{
                                fontFamily: "Helvetica",
                                fontWeight: "600",
                              }}
                            >
                              DEAN/UNIT HEAD
                            </h6>
                          </div>

                          {/** VPAA/VPAF/VPREI/VPCASS */}
                          <div style={{ marginTop: "2rem" }}>
                            <Form id="dean">
                              <Form.Group
                                className="mb-3"
                                controlId="name"
                                onChange={(e) => setVpaaName(e.target.value)}
                                style={{
                                  width: "20rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                              >
                                {/** INPUT FIELD */}
                                <Form.Control
                                  type="text"
                                  placeholder="Please input the name"
                                />
                              </Form.Group>
                            </Form>

                            <h6
                              style={{
                                fontFamily: "Helvetica",
                                fontWeight: "600",
                              }}
                            >
                              VPAA/VPAF/VPREI/VPCASS
                            </h6>
                          </div>

                          {/** EXPORT TO PDF */}
                          <Button type="submit"
                          onClick={formDataHandler}
                            style={{
                              width: "20rem", // Same width as the Form.Group
                              marginTop: "1rem", // Add some spacing above the button
                              backgroundColor: "#CD8800",
                              border: "0",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block", // or 'block' if you want it to take the full width
                                fontFamily: "Helvetica",
                                fontWeight: "500",
                                textAlign: "center", // Optional: center text within the span
                              }}
                            >
                              Export to PDF
                            </span>
                          </Button>


                       
                        </div>

                        <p style={{ marginTop: "2rem" }}>
                          To streamline our processes and reduce complexity,
                          <br /> this component should be printed, elimanating
                          the
                          <br /> need for multiple interfaces.{" "}
                        </p>
                      </Container>
                    </Col>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default AuthorityToTravelForm;
