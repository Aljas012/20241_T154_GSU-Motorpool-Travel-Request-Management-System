import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../STYLES/MotorpoolHomePage.css";
import NavbarComponent from "../../components/NavbarComponent";
import HeadSidebarComponent from "../../components/HeadSideBar";
import WeatherInfo from "../../components/WeatherInfoComponent";
import MotorpoolApprovedModal from "../../components/MotorpoolApprovedModal";

function HeadHomePage() {
  /** REQUEST MODAL FUNC */
  const [requestShow, setRequestModalShow] = useState(false);
  const requestClose = () => setRequestModalShow(false);
  const requestModalShow = () => setRequestModalShow(true);
  const [data,setData] = useState([])


  useEffect(() => {
  const fetchedApprovedRequest = async () => {
        try{
          const response = await fetch('http://localhost:8000/admin/fetched_approved_request',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }})

            if(!response.ok)
            {
              console.log('cannot fetch data.')
              return;
            }
            const responseData = await response.json()
            console.log(responseData)
            setData(responseData.data)
        }catch(error)
        {
          console.log('Something went wrong! Please check your internet connection')
        }
  }

  fetchedApprovedRequest()
},[])


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












  const columns = [ 
    {
      name: "Requestor",
      selector: (row) => row.requestor_name,
    },
    {
      name: "Date of Request",
      selector: (row) => row.request_date,
    },
    {
      name: "Time of Approval",
      selector: (row) => {
        const time = new Date(row.updatedAt).toLocaleTimeString('en-US', { hour12: true }); 
        return time; 
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color: row.status === "Approved" ? "green" : row.status === "Pending" ? "orange" : "red",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <>
      {/** HEADER */}

      <NavbarComponent username="GSU Head" />

      <main>
        <Container fluid>
          <Row className="customRow p-0">
            {/** SIDEBAR */}
            <HeadSidebarComponent requestModalShow={requestModalShow} />

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
                      Good Day, GSU Head
                    </h5>
                  </div>
                </Card>

                <div className="mt-4">
                  <Card className="headCustomCard">
                    <Card.Header>List of Approved Travels</Card.Header>
                    <Card.Body>
                      <div>
                        <DataTable
                          columns={columns}
                          data={data}
                          customStyles={customStyles}
                          highlightOnHover
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </div>
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
                    <p className="customP7">2024 Calendar</p>
                    <Card style={{ height: "36vh", width: "22vw" }}>
                      {/** TUNG CALENDAR */}
                    </Card>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/** REQUEST MODAL */}
          <MotorpoolApprovedModal
            requestShow={requestShow}
            requestClose={requestClose}
            customStyles={customStyles}
          />
        </Container>
      </main>
    </>
  );
}

export default HeadHomePage;
