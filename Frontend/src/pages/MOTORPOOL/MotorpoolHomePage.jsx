import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/MotorpoolHomePage.css";

import NavbarComponent from "../../components/NavbarComponent";

import RequestsModal from "../../components/RequestsModal";
import PostTripInspectionModal from "../../components/PostTripInspectionModal";
import OfficeCodeModal from "../../components/OfficeCodeModal";
import DriversListModal from "../../components/DriverListModal";
import FinalApprovalModal from "../../components/FInalApporvalModal";
import AdminGuideModal from "../../components/AdminGuideApproval";

import VehicleModal from "../../components/VehicleModal";
import SidebarComponent from "../../components/SideBar";
import WeatherInfo from "../../components/WeatherInfoComponent";

function MotorpoolHomePage() {
  /** REQUEST MODAL FUNC */
  const [requestShow, setRequestModalShow] = useState(false);
  const requestClose = () => setRequestModalShow(false);
  const requestModalShow = () => setRequestModalShow(true);

  /** POST TRIP MODAL FUNC */
  const [postShow, setPostModalShow] = useState(false);
  const postClose = () => setPostModalShow(false);
  const postModalShow = () => setPostModalShow(true);

  /** OFFICE CODE MODAL FUNC */
  const [officeShow, setOfficeModalShow] = useState(false);
  const officeClose = () => setOfficeModalShow(false);
  const officeModalShow = () => setOfficeModalShow(true);

  /** DRIVER MODAL FUNC */
  const [driverShow, setDriverModalShow] = useState(false);
  const driverClose = () => setDriverModalShow(false);
  const driverModalShow = () => setDriverModalShow(true);

  /** FINAL APPROVAL MODAL FUNC */
  const [finalShow, setFinalModalShow] = useState(false);
  const finalClose = () => setFinalModalShow(false);
  const finalModalShow = () => setFinalModalShow(true);

  /** ADMIN MODAL FUNC */
  const [guideShow, setGuideModalShow] = useState(false);
  const guideClose = () => setGuideModalShow(false);
  const guideModalShow = () => setGuideModalShow(true);

  /** VEHICLE MODAL FUNC */
  const [vehicleShow, sevehicleModalShow] = useState(false);
  const vehicleClose = () => sevehicleModalShow(false);
  const vehiclelShow = () => sevehicleModalShow(true);

  // Custom styles for the DataTable
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

  /******************************************* SA SELECTION OF YEAR NI SYA ************/
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
      {/** HEADER */}

      <NavbarComponent></NavbarComponent>

      <main>
        <Container fluid>
          <Row className="customRow p-0">
            {/** SIDEBAR */}
            <SidebarComponent
              requestModalShow={requestModalShow}
              postModalShow={postModalShow}
              officeModalShow={officeModalShow}
              driverModalShow={driverModalShow}
              finalModalShow={finalModalShow}
              guideModalShow={guideModalShow}
            />

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
                      Good Day, Admin
                    </h5>
                  </div>
                </Card>

                {/** 3 CARDS */}
                <Row style={{ marginTop: "3rem" }}>
                  <div className="customRowAlignement">
                    <Col>
                      <Card className="customCard2" onClick={requestModalShow}>
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">REQUESTS</h6>
                          </div>

                          <div className="customP8">
                            <p className="m-0">Today's Number of Request</p>
                            <p className="customP8Num">#</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="customCard2" onClick={vehiclelShow}>
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">VEHICLES</h6>
                          </div>

                          <div className="customP8 pb-0">
                            <p className="m-0">Available</p>
                            <p className="customP8Num">#</p>
                          </div>

                          <div className="customP8">
                            <p className="m-0">Total Number of Vehicles</p>
                            <p className="customP8Num">#</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="customCard2">
                        <div className="customCardFont">
                          <div className="customCardAlignment">
                            <h6 className="customH6Card">SERVICES COMPLETED</h6>
                          </div>

                          <div className="customP8">
                            <p className="m-0">Monthly Services Completed</p>
                            <p className="customP8Num">#</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </div>
                </Row>
              </div>
            </Col>

            {/** RIGHT SIDE */}
            <Col>
              <div style={{ padding: "1.6rem 0 0 0" }}>
                <div>
                  <p className="customHeader">MOTORPOOL OFFICE</p>
                </div>
                <div>
                  <WeatherInfo
                    city="Malaybalay City, Bukidnon"
                    temperature="24"
                    precipitation="69"
                    humidity="77"
                    windSpeed="5"
                  />
                  <div className="mt-4">
                    <p className="customP7">Calendar of Year 2024</p>
                    <Card style={{ height: "36vh", width: "22vw" }}></Card>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/** MODALS ***********************************************************/}
          <VehicleModal
            vehicleShow={vehicleShow}
            vehicleClose={vehicleClose}
            customStyles={customStyles}
          />

          {/** VEHUCLE MODAL */}

          {/** REQUEST MODAL */}
          <RequestsModal
            requestShow={requestShow}
            requestClose={requestClose}
            customStyles={customStyles}
          />

          {/** POST TRIP CREATION MODAL */}
          <PostTripInspectionModal
            postShow={postShow}
            postClose={postClose}
            handleMonthChange={handleMonthChange}
            daysInMonth={daysInMonth}
            years={years}
          />

          {/** OFFICE CODE MODAL */}
          <OfficeCodeModal
            officeShow={officeShow}
            officeClose={officeClose}
            customStyles={customStyles}
          />

          {/** DRIVER'S LIST MODAL */}
          <DriversListModal
            driverShow={driverShow}
            driverClose={driverClose}
            customStyles={customStyles}
          />

          {/** FINAL APPROVAL MODAL */}
          <FinalApprovalModal finalShow={finalShow} finalClose={finalClose} />

          {/** ADMIN GUIDE MODAL */}
          <AdminGuideModal guideShow={guideShow} guideClose={guideClose} />
        </Container>
      </main>
    </>
  );
}

export default MotorpoolHomePage;
