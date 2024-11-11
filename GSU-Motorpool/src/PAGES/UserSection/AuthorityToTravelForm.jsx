import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import ATTNavBarComponent from "../../COMPONENTS/UserNavBar/ATTNavbarComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../../STYLES/ATT.css";

{
  /** ICONS */
}
import calendar from "../../ASSETS/CalendarIcon.svg";
import requestor from "../../ASSETS/RequestorIcon.svg";
import position from "../../ASSETS/PositionIcon.svg";
import station from "../../ASSETS/StationIcon.svg";
import travel from "../../ASSETS/TravelIcon.svg";
import destination from "../../ASSETS/DestinationIcon.svg";
import time from "../../ASSETS/TimeIcon.svg";
import fund from "../../ASSETS/FundIcon.svg";
import number from "../../ASSETS/NumberIcon.svg";
import use from "../../ASSETS/UseIcon.svg";

function AuthorityToTravelForm() {
  /** PARA ISA LANG MA CHECK SA CHECKBOX */
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  /** PARA LEGIT ANG DAYS PER MONTH / 30 OR 31 DAYS */
  const [selectedMonth, setSelectedMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(31);

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
  return (
    <>
      <ATTNavBarComponent> </ATTNavBarComponent>

      <main>
        <Container>
          <Row className="fullHeight">
            <Col>
              <div>
                <div className="mb-2">
                  <Button className="customButtonATT">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="customIconATT"
                    />
                  </Button>
                </div>

                <div>
                  <Card className="customCardATT">
                    <Card.Header>Authority To Travel Form</Card.Header>

                    <Form>
                      <div className="d-flex">
                        <Card.Body className="d-flex">
                          {/** LEFT SIDE */}
                          <Col md={7} className="column-border">
                            <div className="alignATT ">
                              {/** DATE OF TRAVEL */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={calendar}
                                    alt="calendar"
                                    className="iconSize"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Date of Travel:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  <Form.Select
                                    id="month"
                                    onChange={handleMonthChange}
                                    className="customBorderATT"
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
                                    className="customBorderATT"
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
                                    className="customBorderATT"
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

                              {/** NAME OF THE REQUESTOR */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={requestor}
                                    alt="requestor"
                                    className="iconSize"
                                  />
                                  <h6 className="noMarPad customFontATT ">
                                    Name of the Requestor:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  <Form.Control
                                    type="text"
                                    placeholder="Mart Erwin Dacajas, John Locker Merdaoc, Davey Sy"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** POSITION / DESTINATION */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={position}
                                    alt="position"
                                    className="iconSize"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Postion/Destination:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  <Form.Control
                                    type="text"
                                    placeholder="Associate Prof 2"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** OFFICIAL STATION */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={station}
                                    alt="station"
                                    className="iconSize"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Official Station:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  <Form.Control
                                    type="text"
                                    placeholder="College of Nursing"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** PURPOSE OF THE TRAVEL */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={travel}
                                    alt="travel"
                                    className="iconSize"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Purpose of the Travel:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  {" "}
                                  <Form.Control
                                    type="text"
                                    placeholder="Team Building"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** DESTINATION */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={destination}
                                    alt="destination"
                                    className="iconSize"
                                  />
                                  <h6 className="noMarPad customFontATT ">
                                    Destination:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  {" "}
                                  <Form.Control
                                    type="text"
                                    placeholder="Boracay"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** PERIOD COVERED */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={time}
                                    alt="time"
                                    className="iconSize"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Period Covered:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  {" "}
                                  <Form.Control
                                    type="text"
                                    placeholder="Optional"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** FUND SOURCE */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={fund}
                                    alt="fund"
                                    className="iconSize"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Fund Source:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  <Form.Control
                                    type="text"
                                    placeholder="Optional"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** AUTHORITY TO TRAVEL NO. */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={number}
                                    alt="number"
                                    className="iconSize"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Authority to Travel No:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  <Form.Control
                                    type="text"
                                    placeholder="1069,2.2022"
                                    className="customBorderATT"
                                  ></Form.Control>
                                </div>
                              </div>

                              {/** USE OF VEHICLE */}
                              <div className="alignCenterATT">
                                <div className="ambot2">
                                  <img
                                    src={use}
                                    alt="use"
                                    className="iconSizeArte"
                                  />

                                  <h6 className="noMarPad customFontATT ">
                                    Use of Vehicle:
                                  </h6>
                                </div>

                                <div className="ambot">
                                  <Form.Check
                                    id="withVehicle"
                                    type="checkbox"
                                    className="customBorderCheckATT margRight"
                                    label={
                                      <span className="customCheckboxLabel">
                                        With Government Vehicle
                                      </span>
                                    }
                                    checked={selectedOption === "withVehicle"}
                                    onChange={() =>
                                      handleCheckboxChange("withVehicle")
                                    }
                                  />
                                  <Form.Check
                                    id="withoutVehicle"
                                    type="checkbox"
                                    className="customBorderCheckATT"
                                    label={
                                      <span className="customCheckboxLabel">
                                        Without Government Vehicle
                                      </span>
                                    }
                                    checked={
                                      selectedOption === "withoutVehicle"
                                    }
                                    onChange={() =>
                                      handleCheckboxChange("withoutVehicle")
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>

                          <div className="vertical-divider"></div>

                          {/** LEFT SIDE */}
                          <Col md={5}>
                            <div>
                              <h5>Recommending Approval:</h5>
                            </div>
                          </Col>
                        </Card.Body>
                      </div>
                    </Form>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default AuthorityToTravelForm;
