import React, { useState } from "react";
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

import ATTNav from "../components/ATT_Nav";

import "../styles/AuthorityToTravelForm.css";

function AuthorityToTravelForm({ children }) {
  const navigate = useNavigate();
  // State to track which checkbox is checked
  const [checked, setChecked] = useState("");

  // Handle checkbox click
  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    // If the same checkbox is clicked, uncheck it; otherwise, check the clicked checkbox
    setChecked(id === checked ? "" : id);
  };

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
                  // Handle click event
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
                          <Form id="ATT_form">
                            {/* DATE OF TRAVEL */}
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
                              <h6
                                style={{ fontFamily: "Helvetica", margin: 0 }}
                              >
                                Date of travel:
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
                                  style={{
                                    marginRight: "0.5rem",
                                    width: "7rem",
                                    border: "1px solid #000000",
                                    borderRadius: "4px",
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
                                  id="day"
                                  aria-label="Select Day"
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
                                  checked={checked === "withGovernmentVehicle"}
                                  onChange={handleCheckboxChange} // Manage checkbox state
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
                                  checked={
                                    checked === "withoutGovernmentVehicle"
                                  }
                                  onChange={handleCheckboxChange} // Manage checkbox state
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
                          <Button
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
