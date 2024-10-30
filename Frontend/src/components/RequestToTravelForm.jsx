import React, { useState } from "react"; // Combine the import
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Corrected import
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Corrected import

function RequestToTravelForm() {
  const handleClick = () => {
    alert("Left arrow clicked!"); // Replace with your desired action
  };

  const currentYear = new Date().getFullYear(); // Get the current year
  const startYear = 2023; // Define the starting year
  const years = []; // Initialize an array to hold the years

  // Populate the years array with the range of years
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#0760A1",
          fontFamily: "Helvetica",
          height: "97.5px",
        }}
      >
        <Container className="d-flex flex-column align-items-start">
          <div className="text-left">
            <h4 className="text-white fw-bold mb-0">Request To Travel</h4>
            <h5 className="text-white mb-0">Request Management System</h5>
          </div>
        </Container>
      </Navbar>

      <main>
        <Container>
          <Row>
            <div>
              <button
                onClick={handleClick} // Handle click event
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

            <Col md={7}>
              <div>
                <Card
                  style={{
                    marginTop: "1rem",
                    paddingBottom: "1rem",
                    marginBottom: "3rem",
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
                      <Form id="RTT_form">
                        {/** 1ST LABEL */}
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

                          <Form.Control id="organization"
                            type="text"
                            placeholder="Organization"
                            style={{
                              width: "22rem",
                              border: "1px solid #000000",
                              borderRadius: "4px",
                              marginLeft: "3rem",
                            }}
                          />
                        </div>
                        {/** 2ND LABEL */}
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

                          <Form.Control id="requestor"
                            type="text"
                            placeholder="Full Name"
                            style={{
                              width: "22rem",
                              border: "1px solid #000000",
                              borderRadius: "4px",
                              marginLeft: "8.2rem",
                            }}
                          />
                        </div>

                        {/** 3RD LABEL */}
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

                          <Form.Control id="contact"
                            type="text"
                            placeholder="Optional"
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

                        {/** 4TH LABEL */}
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

                          {/* Wrap selects in a div to align them horizontally */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "6.4rem",
                            }}
                          >
                            <Form.Select id="month"
                              aria-label="Select Month" 
                              style={{
                                marginRight: "0.5rem",
                                width: "7rem",
                                border: "1px solid #000000", // Add border
                                borderRadius: "4px", // Optional: to add rounded corners
                                marginLeft: "4.4rem",
                              }} // Set width here
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

                            <Form.Select id="day"
                              aria-label="Select Day"
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

                            <Form.Select id="year"
                              aria-label="Select Year"
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

                        {/** 5TH LABEL */}
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

                          {/* Wrap selects in a div to align them horizontally */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "6.4rem",
                            }}
                          >
                            <Form.Control id="time"
                              type="text"
                              placeholder="H"
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
                            <Form.Control id="M"
                              type="text"
                              placeholder="M"
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
                            <Form.Select id="period"
                              aria-label="Select Period"
                              style={{
                                marginLeft: ".7rem",
                                width: "3.8rem",
                                border: "1px solid #000000", // Add border
                                borderRadius: "4px", // Optional: to add rounded corners
                                paddingRight: "1.5rem", // Optional: adjust padding since the arrow is hidden
                                background: "transparent", // Set background to transparent
                                backgroundImage: "none", // Remove any background image (arrow)
                                appearance: "none", // Hides the arrow
                                WebkitAppearance: "none", // For Safari
                                MozAppearance: "none", // For Firefox
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

            <Col md={5}>
              <div>
                <Card
                  style={{
                    marginTop: "1rem",
                    paddingBottom: "1rem",
                    marginBottom: "3rem",
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

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h6
                        style={{
                          fontFamily: "Helvetica",
                          fontWeight: "500",
                          marginRight: "0.1rem",
                        }}
                      >
                        Browse File
                      </h6>

                      {/* Images aligned horizontally with the second H6 */}
                      <img
                        src="./images/UP1_ICON.png" // Replace with your image path
                        alt="Upp" // Provide an appropriate alt text
                        style={{
                          width: "auto", // Adjust width as necessary
                          height: "1.2rem", // Set height as needed
                          marginLeft: "0.5rem", // Optional: space between text and image
                          marginBottom: "0.6rem",
                        }}
                      />

                      <img
                        src="./images/UPP2_ICON.png" // Replace with your image path
                        alt="Upp" // Provide an appropriate alt text
                        style={{
                          width: "auto", // Adjust width as necessary
                          height: "1.2rem", // Set height as needed
                          marginLeft: "0.5rem", // Optional: space between images
                          marginBottom: "0.6rem",
                          marginRight: "13rem",
                        }}
                      />
                    </div>

                    {/* New container for input and button, aligned vertically */}
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="PANGALAN_DAW_SA_FILE.jpg"
                        disabled
                        readOnly
                        style={{
                          width: "22rem",
                          border: "1px solid #000000",
                          borderRadius: "4px",
                          marginBottom: "1rem", // Space between input and button
                        }}
                      />

                      <Button
                        style={{
                          width: "22rem", // Same width as the Form.Group
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
                          Send ATT and RTT
                        </span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>

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
                          Travel Details
                        </h5>

                        <Form>
                          <Form.Group controlId="travelDetails">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Name of Passenger/s..." // Placeholder text
                              style={{
                                border: "1px solid #000000",
                                borderRadius: "4px",
                              }}
                            />
                          </Form.Group>
                        </Form>

                        <Row>
                          <Col>
                            {/** 6TH LABEL */}
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

                              {/* Wrap selects in a div to align them horizontally */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: "1rem",
                                }}
                              >
                                <Form.Select
                                  aria-label="Select Month"
                                  style={{
                                    marginRight: "0.5rem",
                                    width: "7rem",
                                    border: "1px solid #000000", // Add border
                                    borderRadius: "4px", // Optional: to add rounded corners
                                    marginLeft: "4.4rem",
                                  }} // Set width here
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

                                <Form.Select
                                  aria-label="Select Day"
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

                                <Form.Select
                                  aria-label="Select Year"
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

                            {/** 7TH LABEL */}
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

                              <Form.Control
                                type="text"
                                placeholder="Malaybalay City, Bukidnon"
                                style={{
                                  width: "22rem",
                                  border: "1px solid #000000",
                                  borderRadius: "4px",
                                  marginLeft: "6.7rem",
                                }}
                              />
                            </div>
                          </Col>

                          <Col>
                            {/** 8TH LABEL */}
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
                              <Form.Control
                                type="text"
                                placeholder="H"
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
                              <Form.Control
                                type="text"
                                placeholder="M"
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
                              <Form.Select
                                aria-label="Select Period"
                                style={{
                                  marginLeft: ".7rem",
                                  width: "3.8rem",
                                  border: "1px solid #000000", // Add border
                                  borderRadius: "4px", // Optional: to add rounded corners
                                  paddingRight: "1.5rem", // Optional: adjust padding since the arrow is hidden
                                  background: "transparent", // Set background to transparent
                                  backgroundImage: "none", // Remove any background image (arrow)
                                  appearance: "none", // Hides the arrow
                                  WebkitAppearance: "none", // For Safari
                                  MozAppearance: "none", // For Firefox
                                }}
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </Form.Select>
                            </div>

                            {/** 9TH LABEL */}
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
                                Expected Arrival Time:
                              </h6>
                              <Form.Control
                                type="text"
                                placeholder="H"
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
                              <Form.Control
                                type="text"
                                placeholder="M"
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
                              <Form.Select
                                aria-label="Select Period"
                                style={{
                                  marginLeft: ".7rem",
                                  width: "3.8rem",
                                  border: "1px solid #000000", // Add border
                                  borderRadius: "4px", // Optional: to add rounded corners
                                  paddingRight: "1.5rem", // Optional: adjust padding since the arrow is hidden
                                  background: "transparent", // Set background to transparent
                                  backgroundImage: "none", // Remove any background image (arrow)
                                  appearance: "none", // Hides the arrow
                                  WebkitAppearance: "none", // For Safari
                                  MozAppearance: "none", // For Firefox
                                }}
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </Form.Select>
                            </div>

                            {/** 10TH LABEL */}
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
                                Expected Return Date:
                              </h6>
                              <Form.Control
                                type="text"
                                placeholder="M"
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
                              <Form.Control
                                type="text"
                                placeholder="D"
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
                              <Form.Control
                                type="text"
                                placeholder="Y"
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

                            {/**11TH LABEL */}
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
                                Expected Arrival Time:
                              </h6>
                              <Form.Control
                                type="text"
                                placeholder="H"
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
                              <Form.Control
                                type="text"
                                placeholder="M"
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
                              <Form.Select
                                aria-label="Select Period"
                                style={{
                                  marginLeft: ".7rem",
                                  width: "3.8rem",
                                  border: "1px solid #000000", // Add border
                                  borderRadius: "4px", // Optional: to add rounded corners
                                  paddingRight: "1.5rem", // Optional: adjust padding since the arrow is hidden
                                  background: "transparent", // Set background to transparent
                                  backgroundImage: "none", // Remove any background image (arrow)
                                  appearance: "none", // Hides the arrow
                                  WebkitAppearance: "none", // For Safari
                                  MozAppearance: "none", // For Firefox
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
          </Row>
        </Container>
      </main>
    </>
  );
}

export default RequestToTravelForm;
