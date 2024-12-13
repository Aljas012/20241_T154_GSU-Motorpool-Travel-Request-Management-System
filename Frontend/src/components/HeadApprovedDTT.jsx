import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Card, Form, FormControl } from "react-bootstrap";
import { useParams } from 'react-router-dom'; 


const HeadApprovedDTT = ({
  viewHeadApprovedDTTModalShow,
  viewHeadApprovedDTTModalClose,
}) => {
  const [approvedRttData, setApprovedRttData] = useState([]);
  const [driverTripTicket, setDriverTripTicket] = useState([])
  const { requestId } = useParams();


  useEffect(() => {
    
    const fetchedApprovedRtt =async() => {  //para ni sa view approved rtt modal

      try{
        console.log('The user id is ',requestId)
          const response = await fetch(`http://localhost:8000/admin/fetch_approved_rtt/${requestId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json()
          console.log('Successfully fetched approved rtt ',data)
        setApprovedRttData(data)
         fetchDriversTripTicket()
      }
      catch(error){
        console.error('Error fetching approved RTT:', error)
      }
    }
    fetchedApprovedRtt()
  }, [])



          const fetchDriversTripTicket = async() => {
            try{
              const response = await fetch(`http://localhost:8000/admin/fetch_drivers_trip_ticket/${requestId}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const result = await response.json()
            setDriverTripTicket(result)
          console.log('successfulm fetching dtt',result)
            }
            catch(error){
              console.error('Error fetching drivers trip ticket:', error)
            }
        }



        
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    if (dateString.includes('January') || dateString.includes('February')) {
      return dateString.toUpperCase();
    }
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const parts = dateString.split(' ');
    const [month, day, year] = parts;
    const monthIndex = parseInt(month) - 1;
    const monthName = months[monthIndex];
    return `${monthName} ${day}, ${year}`.toUpperCase();
  };



  return (
    <Modal
      show={viewHeadApprovedDTTModalShow} // Correct state usage
      onHide={viewHeadApprovedDTTModalClose} // Correct handler for closing the modal
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            color: "#CD8800",
          }}
        >
          Driver Trip Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card
              style={{
                backgroundColor: "#F1F1F1",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              <Card.Body>
                <Col>
                  <div className="alignmentVRTT">
                    <div className="alignmentVRTTC">
                      <h5 className="noMargMHP customH5HA">
                        GSU HEAD APPROVED
                      </h5>
                    </div>

                    {/** NAME OF DRIVER OF VEHICLE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Name of Driver of Vehicle:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                      {driverTripTicket?.data?.driver_name || 'N/A'}
                      </p>
                    </div>

                    {/** OFFICE/DEPARTMENT/UNIT NAME OF ORGANIZATION */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Government Vehicle to be Used:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                                       {driverTripTicket?.data?.assigned_vehicle || 'N/A'}
                      </p>
                    </div>

                    {/** NAME OF AUTHORIZED PASSENGERS */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Name of Authorized Passengers:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                        <div
                          style={{
                            maxWidth: "100%",
                            marginLeft: "auto",
                            textAlign: "left",
                          }}
                        >
                                            {approvedRttData?.data?.travel_details?.passenger_names || 'N/A'}
                        </div>
                      </p>
                    </div>

                    {/** PLACE TO BE VISITED/INSPECTED */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Place to be Visited/Inspected:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">   {approvedRttData?.data?.travel_details?.destination || 'N/A'}</p>
                    </div>

                    {/** PURPOSE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Purpose:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                        <div
                          style={{
                            maxWidth: "100%",
                            marginLeft: "auto",
                            textAlign: "left",
                          }}
                        >
                           {approvedRttData?.data?.travel_purpose || 'N/A'}
                        </div>
                      </p>
                    </div>

                    {/** TRAVEL CHARGEABLE AGAINST */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Travel Chargeable Against:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                      {driverTripTicket?.data?.travel_expense || 'N/A'}
                      </p>
                    </div>

                    {/** DATE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Date/s to be Used:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRDates">
                        <Form.Control
                          id="month"
                          className="fieldBorder"
                          disabled
                          style={{textAlign: 'right',border: 'none',backgroundColor: 'transparent'}}
                      value={formatDate(approvedRttData?.data?.request_date) || 'N/A'}
                        >
          
                        </Form.Control>

                      </div>
                    </div>

                    <div className="borderEffectVRTT">
                      <h6 className="noMargMHP customH6VRTT">
                        To be Filled by the Driver
                      </h6>
                    </div>

                    {/** TO BE FILLED BY THE DRIVER */}
                    <div className="alignmentVRTTC2">
                      <p className="noMargMHP">
                        Time of Departure from Official Station:
                      </p>
                      <p className="noMargMHP">
                        Time of Arrival as (Per line #4) Above:
                      </p>
                      <p className="noMargMHP">
                        Date & Time of Departure From (Per line #4) Above:
                      </p>
                      <p className="noMargMHP">
                        Time Arrival Black Official Station:
                      </p>
                    </div>

                    {/** SIGNATURE OF THE PASSENGER */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Signature of the Passenger:</p>
                      <p className="noMargMHP custompVRTT">Only when printed</p>
                    </div>

                    {/** PURPOSE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Office Designation:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                      {approvedRttData?.data?.travel_details?.chair_person_name || 'N/A'}
                      </p>
                    </div>

                    {/** NAME AND SIGNATURE OF THE DRIVER */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Name and Signature of the Driver:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                      {driverTripTicket?.data?.driver_name || 'N/A'}
                        <span className="custompVRTT1">
                          /Signature when printed
                        </span>
                      </p>
                    </div>
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default HeadApprovedDTT;
