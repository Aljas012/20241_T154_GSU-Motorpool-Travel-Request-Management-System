import React from "react";
import { Navbar, Container, Row, Col, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Corrected import
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Corrected import

function AuthorityToTravelForm({ children }) {
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
            <h4 className="text-white fw-bold mb-0">Authority To Travel</h4>
            <h5 className="text-white mb-0">Request Management System</h5>
          </div>
          {children} {/* This allows for additional content to be added */}
        </Container>
      </Navbar>

      <main>
        <Container>
          <Row>
            <Col>
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

              <div>
                <Card style={{ marginTop: "1rem" }}>
                  <Card.Header style={{}}>
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
                      backgroundColor: "#F7F7F7",
                    }}
                  >
                    {/* First Card.Body on the left */}
                    <div style={{ flex: 1, padding: "1rem" }}>
                      <Container>
                        <Form>
                          {/* SCHEDULE */}
                          <div
                            style={{ display: "flex", alignItems: "center" }}
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
                              Date of travel:
                            </h6>

                            {/* Wrap selects in a div to align them horizontally */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "6.4rem",
                              }}
                            >
                              <Form.Select
                                aria-label="Select Month"
                                style={{
                                  marginRight: "0.5rem",
                                  width: "7rem",
                                  border: "1px solid #000000", // Add border
                                  borderRadius: "4px", // Optional: to add rounded corners
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

                          {/* NAME OF THE REQUESTOR*/}
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
                              Name of the Requestor:
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="Full Name"
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
                              src="./images/POSITION_ICON.png"
                              alt="Position"
                              style={{
                                width: "auto",
                                height: "2rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Position/Designation:
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="Role"
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
                              src="./images/STATION_ICON.png"
                              alt="Station"
                              style={{
                                width: "auto",
                                height: "2rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Official Station:
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="Office"
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
                              src="./images/PURPOSE_ICON.png"
                              alt="Purpose"
                              style={{
                                width: "auto",
                                height: "2rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Purpose of Travel:
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="Description"
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
                              src="./images/DESTINATION_ICON.png"
                              alt="Purpose"
                              style={{
                                width: "auto",
                                height: "2rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Destination:
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="Location"
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
                              src="./images/TIME_ICON.png"
                              alt="Purpose"
                              style={{
                                width: "auto",
                                height: "2rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Period Covered
                              <br />
                              <span style={{ fontSize: "0.8rem" }}>
                                (Inclusive Travel of Time)
                              </span>
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="Optional"
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
                              src="./images/FUND_ICON.png"
                              alt="Purpose"
                              style={{
                                width: "auto",
                                height: "2rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Fund Source:
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="Optional"
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
                              src="./images/ATTNO_ICON.png"
                              alt="NUMBER"
                              style={{
                                width: "auto",
                                height: "2rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Authority To Travel No:
                            </h6>

                            <Form.Control
                              type="text"
                              placeholder="No."
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
                              src="./images/USEVEHIC_ICON.png"
                              alt="Purpose"
                              style={{
                                width: "auto",
                                height: "1.4rem",
                                marginRight: "1rem",
                              }}
                            />
                            <h6 style={{ fontFamily: "Helvetica", margin: 0 }}>
                              Use of Vehicle:
                            </h6>

                            {/* Checkboxes aligned horizontally with the heading */}
                            <div
                              style={{ display: "flex", marginLeft: "6.5rem" }}
                            >
                              <Form.Check
                                type="checkbox"
                                id="withGovernmentVehicle"
                                label={
                                  <span style={{ fontSize: "12px" }}>
                                    With Government Vehicle
                                  </span>
                                } // Change font size here
                                style={{ marginRight: "1rem" }} // Add spacing between checkboxes
                              />
                              <Form.Check
                                type="checkbox"
                                id="withoutGovernmentVehicle"
                                label={
                                  <span style={{ fontSize: "12px" }}>
                                    Without Government Vehicle
                                  </span>
                                } // Change font size here
                              />
                            </div>
                          </div>
                        </Form>
                      </Container>
                    </div>
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
