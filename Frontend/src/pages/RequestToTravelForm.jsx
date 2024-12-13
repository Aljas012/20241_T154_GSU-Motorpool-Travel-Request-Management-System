import React, { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {Container, Row, Col, Form, Modal,Card,Button,} from "react-bootstrap";
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import RTTNav from "../components/RTT_Nav";

function RequestToTravelForm() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user_info")); // Parse the stored JSON
  const id = userInfo.user_id; // Access the correct key for the user ID
  const handleClick = () => {
    navigate(`/user/id=${id}/homepage`);
  };
  const currentYear = new Date().getFullYear(); // Get the current year
  const startYear = 2023; // Define the starting year
  const years = []; // Initialize an array to hold the years

  // Populate the years array with the range of years
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

        //main 
    
      let [ dateOfRequestMonth,setdateOfRequestMonth] = useState('')  //date of request data
      let [ dateOfRequestDay,setdateOfRequestDay] = useState('')
      let [ dateOfRequestYear,setdateOfRequestYear] = useState('')
      let [ dateOfRequestHour,setdateOfRequestHour] = useState('')
      let [ dateOfRequestMinute,setdateOfRequestMinute] = useState('')
      let [ dateOfRequestType,setdateOfRequestType] = useState('')
      let [ dateOfTravelMonth,setDateOfTravelMonth] = useState('')       //travel details
      let [ dateOfTravelDay,setDateOfTravelDay] = useState('')
      let [ dateOfTravelYear,setDateOfTravelYear] = useState('')
      let [ expectedDepartureHour,setExpectedDepartureHour] = useState('')
      let [ expectedDepartureMinute,setExpectedDepartureMinute] = useState('')
      let [ expectedDepartureType,setExpectedDepartureType] = useState('')
      let [ expectedArrivalHour,setExpectedArrivalHour] = useState('')
      let [ expectedArrivalMinute,setExpectedArrivalMinute] = useState('')
      let [ expectedArrivalType,setExpectedArrivalType] = useState('')
      let [ expectedReturnDateMonth,setExpectedReturnDateMonth] = useState('')
      let [ expectedReturnDateDay,setExpectedReturnDateDay] = useState('')
      let [ expectedReturnDateYear,setExpectedReturnDateYear] = useState('')
      let [ expectedReturnArrivalHour,setExpectedReturnArrivalHour] = useState('')
      let [ expectedReturnArrivalMinute,setExpectedReturnArrivalMinute] = useState('')
      let [ expectedReturnArrivalType,setExpectedReturnArrivalType] = useState('')
      let [imageUrl,setImageUrl] = useState(null)
      const [isImageUploaded, setIsImageUploaded] = useState(false);

      //final output
      let [ organization_name,setOrganizationName] = useState('')
      let [ requestor_name,setRequestorName] = useState('')
      let [ contact_number,setContactNumber] = useState('')
      let [ passenger_names,setPassangerName] = useState('')
      let [ destination, setDestination] = useState('')
      let [ travel_purpose,setTravelPurpose] = useState('')
      let [ att_File,setAttImage] = useState(null);

      let  request_time = dateOfRequestHour+':'+dateOfRequestMinute+ ' '+dateOfRequestType;
      let  request_date = dateOfRequestMonth+' '+dateOfRequestDay+' '+dateOfRequestYear;
      let  date_travel = dateOfTravelMonth+ ' '+dateOfTravelDay+' '+dateOfTravelYear
      let  departure_time = expectedDepartureHour+ ':'+expectedDepartureMinute+' '+expectedDepartureType
      let  return_departure_arrival_time = expectedArrivalHour+':'+expectedArrivalMinute+' '+expectedArrivalType
      let  return_date = expectedReturnDateMonth+' '+expectedReturnDateDay+' '+expectedReturnDateYear;
      let  return_arrival_time = expectedReturnArrivalHour+' '+expectedReturnArrivalMinute+" "+expectedReturnArrivalType;
      const cloudinary_cloud_name = "dvhfgstud"
      const  cloudinary_url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`;
      const [errorModal,setShowErrorModal] = useState(false)
      const [errorMessage,setErrorMessage] = useState('')
      const [errorColor,setErrorColor] = useState('')
      const [errorIcon,setErrorIcon] = useState('')
      const [errorDiv,setErrorDiv] = useState('')
      const warning = '#FCC737'
      const danger = '#C63C51'
      const success = '#7ED4AD'
     const [loadingModal,setShowLoadingModal] = useState(false)
     const [loadingMessage,setLoadingMessage] = useState('')
  



      const onInputImage = async (e) => {
        const file = e.target.files[0];
        setShowLoadingModal(true)
        setLoadingMessage('Please wait while uploading file...')
        if (file) {
          const fileExtension = file.name.split('.').pop().toLowerCase();
          const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif','pdf'];
    
          if (allowedExtensions.includes(fileExtension)) {
            setAttImage(file); 
    
            // Setting up FormData for the file upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'gsu_motorpool'); // Replace with your Cloudinary upload preset
    
            try {
              const cloudinaryResponse = await fetch(cloudinary_url, {
                method: 'POST',
                body: formData,
              });
           
              if (!cloudinaryResponse.ok) {
                setShowLoadingModal(false)
                alert('Unable to upload file to Cloudinary');
                return;
              }
              
              const responseData = await cloudinaryResponse.json();
              setImageUrl(responseData.secure_url); // Update the state with the 
              setIsImageUploaded(true); 
              setShowLoadingModal(false)
            } catch (error) {
              setShowErrorModal(true)
              setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732116882/warning_xpcpdr.png')
              setErrorColor('white')
              setErrorDiv(danger)
              setErrorMessage('Something went wrong! Please check your internet connection and try again.')
             
            }
    
          } else {

            setShowErrorModal(true)
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732116882/warning_xpcpdr.png')
            setErrorColor('white')
            setErrorDiv(danger)
            setErrorMessage('Only .png, .jpg, .jpeg, or .gif files are allowed.')
            e.target.value = '';
          }
        } else {
          setShowErrorModal(true)
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png')
          setErrorColor('white')
          setErrorDiv(warning)
          setErrorMessage('Please select a file to upload first before proceeding.')
          return;
        }
      };
    
      // Using useEffect to monitor changes to imageUrl
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from auto-submitting
        if(att_File === null)
        {
          setShowErrorModal(true)
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png')
          setErrorColor('white')
          setErrorDiv(warning)
          setErrorMessage('Please select a file to upload first before proceeding.')
          return;
        }
        if (!isImageUploaded) {
          alert('Please wait for the image to finish uploading.');
          return;
        }
      
        // Call the function to submit the form data
        requestToTravelHandler();

      };
      

      const requestToTravelHandler = async () => {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        const userId = userInfo?.user_id;
    
        if (imageUrl === null) {
          alert('The attachment file is still uploading. Please wait!');
          return; // Exit the function to prevent proceeding
        }
    
        const data = {
          userId, organization_name,   requestor_name,  contact_number, request_date, request_time,
          passenger_names,date_travel,destination,departure_time,return_date,return_arrival_time,
          travel_purpose,return_departure_arrival_time, imageUrl,};
        try {
          // Send the request to the backend
          const response = await fetch('http://localhost:8000/user/travel_request', {
            method: "POST", // Corrected "METHOD" to "method"
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            setShowErrorModal(true)
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png')
            setErrorColor('white')
            setErrorDiv(warning)
            setErrorMessage('You have already submitted a request. If you wish to submit another request, please use a different requester name. Thank you.')
            return;
          }
          setShowErrorModal(true)
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png')
          setErrorColor('white')
          setErrorDiv(success)
          setErrorMessage('Successfully submitting you request.  Your request is currently reviewed by the admin. Thankyou')
        } catch (error) {
          console.error('Error sending the data -- frontend:', error);
        }
      };
      




  return (
    <>
      {/** HEADER */}
      <RTTNav></RTTNav>

      {/** BODY */}
      <main>
        <Container>
          <Row>
            <div>
              {/** BACK BUTTON */}
              <button
                onClick={handleClick}
                style={{
                  backgroundColor: "#0760A1",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "4px",
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

            {/** FIRST COLUMN / LEFT SIDE */}
            <Col md={7}>
              <div>
                <Card
                  style={{
                    marginTop: "1rem",
                    paddingBottom: "1rem",
                    marginBottom: ".8rem",
                    backgroundColor: "#F7F7F7",
                    height: "22.4rem",
                  }}
                >
                  <Card.Body
                    style={{
                      display: "flex",
                      alignItems: "stretch",
                    }}
                  >
                    <Container>
                      <Form id="RTT_form" onSubmit={requestToTravelHandler}>
                        {/** OFFICE/DEPARTMENT/UNIT NAME OF ORGANIZATION */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="./images/OFF_ICON.png"
                            alt="Requestor"
                            style={{
                              width: "auto",
                              height: "2rem",
                              marginRight: "1rem",
                            }}
                          />
                          <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                            Office/Department/Unit <br />
                            Name of Organization
                          </h6>

                          <Form.Control
                            id="organization"
                            type="text"
                            placeholder="Organization"
                            onChange={(e) => setOrganizationName(e.target.value)}
                            style={{
                              width: "22rem",
                              border: "1px solid #000000",
                              borderRadius: "4px",
                              marginLeft: "3rem",
                            }}
                          />
                        </div>

                        {/** REQUESTOR */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "1rem",
                          }}
                        >
                          <img
                            src="./images/REQUESTOR_ICON.png"
                            alt="Requestor"
                            style={{
                              width: "auto",
                              height: "2rem",
                              marginRight: "1rem",
                            }}
                          />
                          <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                            Requestor:
                          </h6>

                          <Form.Control
                            id="requestor"
                            type="text"
                            placeholder="Full Name"
                            onChange={(e) => setRequestorName(e.target.value)}
                            style={{
                              width: "22rem",
                              border: "1px solid #000000",
                              borderRadius: "4px",
                              marginLeft: "8.2rem",
                            }}
                          />
                        </div>

                        {/** CONTACT NUMBER */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "1rem",
                          }}
                        >
                          <img
                            src="./images/CONTACT_ICON.png"
                            alt="Requestor"
                            style={{
                              width: "auto",
                              height: "2rem",
                              marginRight: "1rem",
                            }}
                          />
                          <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                            Contact Number:
                          </h6>

                          <Form.Control
                            id="contact"
                            type="text"
                            placeholder="Optional"
                            onChange={(e) => setContactNumber(e.target.value)}
                            style={{
                              width: "22rem",
                              border: "1px solid #000000",
                              borderRadius: "4px",
                              marginLeft: "5.6rem",
                            }}
                          />
                        </div>

                        <div>
                          <h5
                            style={{
                              fontFamily: "Helvetica",
                              fontWeight: "600",
                              marginTop: "1.5rem",
                            }}
                          >
                            Date of Request
                          </h5>
                        </div>

                        {/** DATE */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "1.5rem",
                          }}
                        >
                          <img
                            src="./images/CALENDAR_ICON.png"
                            alt="Calendar"
                            style={{
                              width: "auto",
                              height: "2rem",
                              marginRight: "1rem",
                            }}
                          />
                          <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                            Date:
                          </h6>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "6.4rem",
                            }}
                          >
                            {/** MONTH */}
                            <Form.Select
                              id="month"
                              aria-label="Select Month"
                              onChange={(e) => setdateOfRequestMonth(e.target.value)}
                              style={{
                                marginRight: "0.5rem",
                                width: "7rem",
                                border: "1px solid #000000",
                                borderRadius: "4px",
                                marginLeft: "4.4rem",
                              }}
                            >
                              <option>Month</option>
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

                            {/** DAY */}
                            <Form.Select
                              id="day"
                              aria-label="Select Day"
                              onChange={(e) => setdateOfRequestDay(Number(e.target.value))}
                              style={{
                                marginRight: "0.5rem",
                                width: "7rem",
                                border: "1px solid #000000",
                                borderRadius: "4px",
                              }}
                            >
                              <option>Day</option>
                              {[...Array(31)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </Form.Select>

                            {/** YEAR */}
                            <Form.Select
                              id="year"
                              aria-label="Select Year"
                              onChange={(e) => setdateOfRequestYear(Number(e.target.value))}
                              required
                              style={{
                                width: "7rem",
                                border: "1px solid #000000",
                                borderRadius: "4px",
                              }}
                            >
                              <option>Year</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Select>
                          </div>
                        </div>

                        {/** TIME */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "1rem",
                          }}
                        >
                          <img
                            src="./images/TIME_ICON.png"
                            alt="Calendar"
                            style={{
                              width: "auto",
                              height: "2rem",
                              marginRight: "1rem",
                            }}
                          />
                          <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                            Time:
                          </h6>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "6.4rem",
                            }}
                          >
                            {/** HOUR */}
                            <Form.Control
                              id="time"
                              type="text"
                              placeholder="H"
                              onChange={(e) => setdateOfRequestHour(e.target.value)}
                              required
                              style={{
                                width: "3rem",
                                border: "1px solid #000000",
                                borderRadius: "4px",
                                marginLeft: "4.4rem",
                              }}
                              inputMode="numeric"
                              maxLength={2} // Limit the input length to 2
                              onKeyPress={(e) => {
                                // Allow only numbers (0-9)
                                if (!/[0-9]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            <span
                              style={{
                                marginRight: "0.5rem",
                                marginLeft: "0.5rem",
                                fontWeight: "700",
                              }}
                            >
                              :
                            </span>{" "}
                            {/** MINUTE */}
                            <Form.Control
                              id="M"
                              type="text"
                              placeholder="M"
                              onChange={(e) => setdateOfRequestMinute(e.target.value)}
                              required
                              style={{
                                width: "3rem",
                                border: "1px solid #000000",
                                borderRadius: "4px",
                              }}
                              inputMode="numeric"
                              maxLength={2} // Limit the input length to 2
                              onKeyPress={(e) => {
                                // Allow only numbers (0-9)
                                if (!/[0-9]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {/** AM OR PM */}
                            <Form.Select
                              id="period"
                              aria-label="Select Period"
                              onChange={(e) => setdateOfRequestType(e.target.value)}
                              required
                              style={{
                                marginLeft: ".7rem",
                                width: "3.8rem",
                                border: "1px solid #000000",
                                borderRadius: "4px",
                                paddingRight: "1.5rem",
                                background: "transparent",
                                backgroundImage: "none",
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                              }}
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </Form.Select>
                          </div>
                        </div>
                      </Form>
                    </Container>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/** SECOND COLUMN / RIGHT SIDE */}
            <Col md={5}>
              <div>
                <Card
                  style={{
                    marginTop: "1rem",
                    paddingBottom: "1rem",
                    marginBottom: ".8rem",
                    backgroundColor: "#F7F7F7",
                    height: "22.4rem",
                  }}
                >
                  <div style={{ marginTop: "1rem", justifyItems: "center" }}>
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        marginTop: "4.5rem",
                        marginBottom: "2rem",
                      }}
                    >
                      Upload the Approved Authority To Travel form
                    </h6>

                    {/** TO UPLOAD THE FILE */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                
                    
                    </div>

                    <div>
                      {/** FIELD PATA SA i-UPLOAD NA FILE */}
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Only images are allowed</Form.Label>
                        <Form.Control type="file" accept=".jpg, .jpeg, .png, .pdf" onChange={onInputImage}/>
                      </Form.Group>

                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        style={{
                          width: "22rem",
                          backgroundColor: "#CD8800",
                          border: "0",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            fontFamily: "Helvetica",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                            SUBMIT TO GSU HEAD
                        </span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>

            {/** PARA SA UBOS NA CARD */}
            <Row style={{ margin: "0", padding: "0" }}>
              <Col md={12}>
                <div>
                  <Card
                    style={{
                      marginTop: "1rem",
                      paddingBottom: "1rem",
                      marginBottom: "1rem",
                      backgroundColor: "#F7F7F7",
                    }}
                  >
                    <Container>
                      <Card.Body>
                        <h5
                          style={{
                            fontFamily: "Helvetica",
                            fontWeight: "600",
                            borderBottom: "2px solid #000", // Adjust the color and thickness as needed
                            paddingBottom: "0.5rem", // Add some space below the text
                            marginBottom: "1rem",
                          }}
                        >
                          Travel Details
                        </h5>

                        {/** INPUT FIELD  */}
                        <Form>
                          <Form.Group controlId="travelDetails">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Name of Passenger/s..." // Placeholder text
                              onChange={(e) => setPassangerName(e.target.value)}
                              style={{
                                border: "1px solid #000000",
                                borderRadius: "4px",
                              }}
                            />
                          </Form.Group>
                        </Form>

                        <Row>
                          {/** COLUMN PARA SA LOWER LEFT */}
                          <Col>
                            {/** DATE OF TRAVEL */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "3.8rem",
                              }}
                            >
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Date of Travel:
                              </h6>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: "1rem",
                                }}
                              >
                                {/** MONTH */}
                                <Form.Select
                                  aria-label="Select Month"
                                  onChange={(e) => setDateOfTravelMonth(e.target.value)}
                                  style={{
                                    marginRight: "0.5rem",
                                    width: "7rem",
                                    border: "1px solid #000000",
                                    borderRadius: "4px",
                                    marginLeft: "4.4rem",
                                  }}
                                >
                                  <option>Month</option>
                                  <option value="1">January</option>
                                  <option value="2">February</option>
                                  <option value="3">March</option>
                                  <option value="4">April</option>
                                  <option value="5">May</option>
                                  <option value="6">June</option>
                                  <option value="7">July</option>
                                  <option value="8">August</option>
                                  <option value="9">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </Form.Select>

                                {/** DAY */}
                                <Form.Select
                                  aria-label="Select Day"
                                  onChange={(e) => setDateOfTravelDay(Number(e.target.value))}
                                  style={{
                                    marginRight: "0.5rem",
                                    width: "7rem",
                                    border: "1px solid #000000", // Add border
                                    borderRadius: "4px", // Optional: to add rounded corners
                                  }} // Set width here
                                >
                                  <option>Day</option>
                                  {[...Array(31)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </Form.Select>

                                {/** MONTH */}
                                <Form.Select
                                  aria-label="Select Year"
                                  onChange={(e) => setDateOfTravelYear(Number(e.target.value))}
                                  style={{
                                    width: "7rem",
                                    border: "1px solid #000000", // Add border
                                    borderRadius: "4px",
                                  }} // Set width here
                                >
                                  <option>Year</option>
                                  {/* Assuming years is an array defined in your component */}
                                  {years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </Form.Select>
                              </div>
                            </div>

                            {/** DESTINATION */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Destination:
                              </h6>

                              {/** INPUT FIELD */}
                              <Form.Control
                                type="text"
                                placeholder="Malaybalay City, Bukidnon"
                                onChange={(e) => setDestination(e.target.value)}
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "6.7rem",
                                }}
                              />
                            </div>
                          </Col>

                          {/** COLUMN PARA SA LOWER RIGHT */}
                          <Col>
                            {/** EXPECTED DEPARTURE TIME  */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Expected Departure Time:
                              </h6>
                              {/** HOURS */}
                              <Form.Control
                                type="text"
                                placeholder="H"
                                onChange={(e) => setExpectedDepartureHour(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "4.4rem",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <span
                                style={{
                                  marginRight: "0.5rem",
                                  marginLeft: "0.5rem",
                                  fontWeight: "700",
                                }}
                              >
                                :
                              </span>{" "}
                              {/** MINUTES */}
                              <Form.Control
                                type="text"
                                placeholder="M"
                                onChange={(e) => setExpectedDepartureMinute(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {/** AM OR PM */}
                              <Form.Select
                                aria-label="Select Period"
                                onChange={(e) => setExpectedDepartureType(e.target.value)}
                                style={{
                                  marginLeft: ".7rem",
                                  width: "3.8rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  paddingRight: "1.5rem",
                                  background: "transparent",
                                  backgroundImage: "none",
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                }}
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </Form.Select>
                            </div>

                            {/** EXPECTED ARRIVAL TIME */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: ".5rem",
                              }}
                            >
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Expected Arrival Time:
                              </h6>
                              {/** HOURS */}
                              <Form.Control
                                type="text"
                                placeholder="H"
                                onChange={(e) => setExpectedArrivalHour(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "6.1rem",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <span
                                style={{
                                  marginRight: "0.5rem",
                                  marginLeft: "0.5rem",
                                  fontWeight: "700",
                                }}
                              >
                                :
                              </span>{" "}
                              {/** MINUTES */}
                              <Form.Control
                                type="text"
                                placeholder="M"
                                onChange={(e) => setExpectedArrivalMinute(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {/** AM OR PM */}
                              <Form.Select
                                aria-label="Select Period"
                                onChange={(e) => setExpectedArrivalType(e.target.value)}
                                style={{
                                  marginLeft: ".7rem",
                                  width: "3.8rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  paddingRight: "1.5rem",
                                  background: "transparent",
                                  backgroundImage: "none",
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                }}
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </Form.Select>
                            </div>

                            {/** EXPECTED RETURN DATE */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: ".5rem",
                              }}
                            >
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Expected Return Date:
                              </h6>
                              {/** MONTH */}
                              <Form.Control
                                type="text"
                                placeholder="M"
                                onChange={(e) => setExpectedReturnDateMonth(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "5.9rem",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <span
                                style={{
                                  marginRight: "0.5rem",
                                  marginLeft: "0.5rem",
                                  fontWeight: "400",
                                }}
                              >
                                /
                              </span>{" "}
                              {/** DAYS */}
                              <Form.Control
                                type="text"
                                placeholder="D"
                                onChange={(e) => setExpectedReturnDateDay(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <span
                                style={{
                                  marginRight: "0.5rem",
                                  marginLeft: "0.5rem",
                                  fontWeight: "400",
                                }}
                              >
                                /
                              </span>{" "}
                              {/** YEARS */} 
                              <Form.Control
                                type="text"
                                placeholder="Y"
                                onChange={(e) => setExpectedReturnDateYear(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </div>

                            {/** EXPECTED ARRIVAL TIME */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: ".5rem",
                              }}
                            >
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Expected Arrival Time:
                              </h6>
                              {/** HOURS */}
                              <Form.Control
                                type="text"
                                placeholder="H"
                                onChange={(e) => setExpectedReturnArrivalHour(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "6.1rem",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <span
                                style={{
                                  marginRight: "0.5rem",
                                  marginLeft: "0.5rem",
                                  fontWeight: "700",
                                }}
                              >
                                :
                              </span>{" "}
                              {/** MINUTES */}
                              <Form.Control
                                type="text"
                                placeholder="M"
                                onChange={(e) => setExpectedReturnArrivalMinute(Number(e.target.value))}
                                style={{
                                  width: "3rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                }}
                                inputMode="numeric"
                                maxLength={2} // Limit the input length to 2
                                onKeyPress={(e) => {
                                  // Allow only numbers (0-9)
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {/** AM OR PM */}
                              <Form.Select
                                aria-label="Select Period"
                                onChange={(e) => setExpectedReturnArrivalType(e.target.value)}
                                style={{
                                  marginLeft: ".7rem",
                                  width: "3.8rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  paddingRight: "1.5rem",
                                  background: "transparent",
                                  backgroundImage: "none",
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                }}
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </Form.Select>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Container>
                  </Card>
                </div>
              </Col>
            </Row>

            {/** PARA SA PINAKA UBOS NA CARD */}
            <Row style={{ margin: "0", padding: "0" }}>
              <Col md={12}>
                <div>
                  <Card
                    style={{
                      marginTop: "1rem",
                      paddingBottom: "1rem",
                      marginBottom: "3rem",
                      backgroundColor: "#F7F7F7",
                    }}
                  >
                    <Container>
                      <Card.Body>
                        <h5
                          style={{
                            fontFamily: "Helvetica",
                            fontWeight: "600",
                            borderBottom: "2px solid #000", // Adjust the color and thickness as needed
                            paddingBottom: "0.5rem", // Add some space below the text
                            marginBottom: "1rem",
                          }}
                        >
                          Purpose of Travel
                        </h5>

                        {/** INPUT FIELD  */}
                        <Form>
                          <Form.Group controlId="travelDetails">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Details..." // Placeholder text
                              onChange={(e) => setTravelPurpose(e.target.value)}
                              style={{
                                border: "1px solid #000000",
                                borderRadius: "4px",
                              }}
                            />
                          </Form.Group>
                        </Form>
                      </Card.Body>


                      <Modal 
                        show={loadingModal} 
                        centered 
                        style={{borderRadius: '0'}}
                        dialogClassName="modal-no-radius"
                      >
                        <Modal.Body 
                          className="modal-body-no-radius"
                          style={{ 
                            display: 'flex', 
                            marginTop:'2rem',
                            marginBottom:'2rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: 0
                          }}
                        >
                          <ReactLoading type="spin" color="#CD8800" height={50} width={50} />
                          <p style={{color: 'black', textAlign:'center', margin:'.5rem'}}>{loadingMessage}</p>
                        </Modal.Body>
                      </Modal>
                      

                      <Modal show={errorModal} centered>
                            <Modal.Body style={{ backgroundColor: errorColor, borderRadius: '0px', display: 'flex',
                                justifyContent: 'center',alignItems: 'center',flexDirection: 'column',padding: 0,}}>
                              <img src={errorIcon} alt="no internet" height="90px" width="90px" draggable={false} style={{marginBottom: "1.5em",marginTop:'2rem'}}/>
                              <p style={{color: 'black',textAlign:'center',margin:'.5rem'}}>{errorMessage}</p>
                              <div style={{display:'flex',backgroundColor:errorDiv,width:'100%',  padding: '10px',marginTop:'1em',justifyContent:'center'}}>
                              <button style={{ backgroundColor: 'transparent',border:'none',margin:'.8em',color:'white'}} onClick={()=>setShowErrorModal(false)}> DISMISS </button>
                            </div>
                            </Modal.Body>
                      </Modal>

                    </Container>
                  </Card>
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default RequestToTravelForm;
