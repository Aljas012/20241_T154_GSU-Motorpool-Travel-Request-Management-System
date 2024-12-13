import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Card, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';
// sulod sa view request tas view Rtt modal
const HeadApprovedRTT = ({
  viewHeadApprovedRTTModalShow,
  viewHeadApprovedRTTModalClose,
}) => {

  const [approvedRttData, setApprovedRttData] = useState([]);
  const [driverTripTicket, setDriverTripTicket] = useState([])
  
  const {reference_id,requestId,userId} = useParams(); 
  //reference_id - request_data's _id
  //requestId - 
  //userId - user's _id

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
      show={viewHeadApprovedRTTModalShow} // Correct state usage
      onHide={viewHeadApprovedRTTModalClose} // Correct handler for closing the modal
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
          Request To Travel
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

                    {/** NAME OF THE REQUESTOR */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Name of the Requestor:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">    {approvedRttData?.data?.requestor_name.toUpperCase() || 'N/A'} </p>
                    </div>

                    {/** OFFICE/DEPARTMENT/UNIT NAME OF ORGANIZATION */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Office/Department/Unit Name of Organization:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">   {approvedRttData?.data?.organization_name.toUpperCase() || 'N/A'}  </p>
                    </div>

                    {/** CONTACT NUMBER */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Contact Number:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">   {approvedRttData?.data?.contact_number || 'N/A'}</p>
                    </div>

                    <div className="borderEffectVRTT">
                      <h6 className="noMargMHP customH6VRTT">
                        Date of Request
                      </h6>
                    </div>

                    {/** DATE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Date:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRDates">
                        <Form.Control 
                          id="month"
                          className="fieldBorder"
                          style={{textAlign: 'right',border: 'none',backgroundColor: 'transparent'}}
                          disabled
                          value=  {approvedRttData?.data?.request_date || 'N/A'}
                        >
                          
                        </Form.Control>

                      </div>
                    </div>

                    {/** TIME */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Time:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRTime">
                        {/* HOUR */}
                        <Form.Control   id="time"    type="text"
                          /** REFLECT LANG BOSS */
                          placeholder="Hour"
                          className="fieldBorder"
                          value=  {approvedRttData?.data?.request_time || 'N/A'}
                          style={{textAlign: 'right',border: 'none',backgroundColor: 'transparent'}}
                          disabled
                        />
                     
                      </div>
                    </div>

                    <div className="borderEffectVRTT">
                      <h6 className="noMargMHP customH6VRTT">Travel Details</h6>
                    </div>

                    {/** DATE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Date:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRDates">
                        <Form.Control
                          id="month"
                          className="fieldBorder"
                          disabled
                          style={{textAlign: 'right',border: 'none',backgroundColor: 'transparent'}}
                          value={formatDate(approvedRttData?.data?.travel_details?.date_travel) || 'N/A'}
                        >
                     
                        </Form.Control>

                      </div>
                    </div>

                    {/** DESTINATION */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Destination:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                      {approvedRttData?.data?.travel_details?.destination.toUpperCase() || 'N/A'}
                      </p>
                    </div>

                    {/** NAME OF PASSENGER/S */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Name of Passenger/s:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                        <div
                          style={{
                            maxWidth: "80%",
                            marginLeft: "auto",
                            textAlign: "left",
                          }}
                        >
                          {Array.isArray(approvedRttData?.data?.travel_details?.passenger_names) 
                            ? approvedRttData.data.travel_details.passenger_names.map(name => name.toUpperCase()).join(', ') 
                            : 'N/A'}
                        </div>
                      </p>
                    </div>

                    <div className="alignmentTimeVRTT3">
                      {/** LEFT SIDE */}
                      <div>
                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-3">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">
                              Expected Departure Time:
                            </p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                            <Form.Control
                              type="text"
                              placeholder="1"
                              disabled
                              className="customControlVRTT"
                              style={{textAlign: 'center',border: 'none',backgroundColor: 'transparent'}}
                              value={approvedRttData?.data?.travel_details?.departure_time.toUpperCase() || 'N/A'}
                            />
                    
                          </div>
                        </div>

                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-1">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">Expected Arrival Time:</p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                            <Form.Control
                              type="text"
                              placeholder="1"
                              disabled
                              className="customControlVRTT"
                              style={{textAlign: 'center',border: 'none',backgroundColor: 'transparent'}}
                              value={approvedRttData?.data?.travel_details?.arrival_time.toUpperCase() || 'N/A'}
                            />
                       
                          </div>
                        </div>
                      </div>

                      {/** RIGHT SIDE */}
                      <div>
                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-3">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">Expected Return Date:</p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                            <Form.Control
                              type="text"
                              placeholder="1"
                              disabled
                              className="customControlVRTT"
                              style={{textAlign: 'center',border: 'none',backgroundColor: 'transparent'}}
                              value={approvedRttData?.data?.travel_details?.return_date ? 
                                formatDate(approvedRttData?.data?.travel_details?.return_date) : 
                                'N/A'
                              }
                            />
                           
                          </div>
                        </div>

                        {/** */}
                        <div className="alignmentTimeVRTT1 mt-1">
                          {/**  */}
                          <div style={{ paddingLeft: ".8rem" }}>
                            <p className="noMargMHP">Expected Return Time:</p>
                          </div>

                          {/** REFLECT DIRI */}
                          <div className="alignmentTimeVRTT">
                            <Form.Control
                              type="text"
                              placeholder="1"
                              disabled
                              className="customControlVRTT"
                              style={{textAlign: 'center',border: 'none',backgroundColor: 'transparent'}}
                              value={approvedRttData?.data?.travel_details?.return_arrival_time.toUpperCase() || 'N/A'}
                            />
                        
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** PURPOSE OF TRAVEL */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Purpose of Travel:</p>
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

                    <div className="borderEffectVRTT">
                      <h6 className="noMargMHP customH6VRTT">
                        Motor Vehicle Reservation Details
                      </h6>
                    </div>

                    {/** TYPE OF VEHICLE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Type of Vehicle:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">{driverTripTicket?.data?.assigned_vehicle || 'N/A'}</p>
                    </div>
 
                    {/** MOTOR VEHICLE PLATE NUBMER */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Motor Vehicle Plate Number:</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">{driverTripTicket?.data?.plate_number || 'N/A'}</p>
                    </div>

                    {/** NAME AND SIGNATURE OF THE DRIVER */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Name and Signature of the Driver:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                      {driverTripTicket?.data?.driver_name || 'N/A'}
                      </p>
                    </div>

                    {/** AMOUNT GAS/DIESEL REFUELED IN LITER */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Amount Gas/Diesel Refueled in Liter:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">{driverTripTicket?.data?.gas_amount || 'N/A'}</p>
                    </div>

                    {/** AMOUNT GAS/DIESEL VERIFIED BY THE GAS BOY */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Amount Gas/Diesel Verified by the Gas Boy:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">
                      {driverTripTicket?.data?.verified_gas_amount || 'N/A'}
                      </p>
                    </div>

                    {/** RESERVATION PROCESS AND CONFIRM BY */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">
                        Reservation Process and Confirm by:
                      </p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">{driverTripTicket?.data?.process_confirmed_personnel.toUpperCase() || 'N/A'}</p>
                    </div>

                    {/** VERIFIED BY */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Verified by :</p>
                      {/** REFLECT DIRI */}
                      <p className="noMargMHP custompVRTT">{driverTripTicket?.data?.verified_by.toUpperCase() || 'N/A'}</p>
                    </div>

                    {/** VERIFIED DATE */}
                    {/** DATE */}
                    <div className="alignmentVRTTC">
                      <p className="noMargMHP">Verified Date:</p>
                      {/** REFLECT DIRI */}
                      <div className="alignCenterVRDates">
                        <Form.Control
                          id="month"
                          className="fieldBorder"
                          disabled
                          style={{textAlign: 'right',border: 'none',backgroundColor: 'transparent'}}
                          value={driverTripTicket?.data?.verified_date || 'N/A'}
                        >
                        </Form.Control>
                  

                      </div>
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

export default HeadApprovedRTT;
