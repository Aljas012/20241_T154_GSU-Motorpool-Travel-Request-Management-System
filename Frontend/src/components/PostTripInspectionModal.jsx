import React from 'react';
import { Modal, Row, Col, Card, Form, Button } from 'react-bootstrap';
const PostTripInspectionModal = ({ postShow, postClose, handleMonthChange, daysInMonth, years }) => {
  const adminInfo = JSON.parse(localStorage.getItem("admin_info")) || {};
  const currentUser = adminInfo.name;


  const fetchAlldrivers = async () =>
      {
        try{
          const response  = await fetch('http://localhost:8000/admin/fetch_available_drivers',
            {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
              })
          
          const responseData  = await response.json();
        console.log('available data ',responseData);
        }catch(error)
          {
            alert('unable to fetch available drivers')
        }
  }



const exportPdfHandler = async () =>
    {
   
    

  } 



  return (
    <Modal show={postShow} onHide={postClose} size="xl" >
      <Modal.Header closeButton>
        <Modal.Title
          style={{

            fontSize: '1.7rem',
            fontWeight: 'bold',
            color: '#CD8800',

          }}
        >
          Pre and Post - Trip Inspection Checklist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: '#F1F1F1' }}>
              <Row>
                {/* LEFT SIDE */}
                <Col>
                  <div className="alignTIC p-4" style={{ borderRight: '1px solid #00000066' }}>
                    <Form onSubmit={exportPdfHandler()}>
                      {/* INSPECTED BY */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP ">Inspected by:</h6>
                        <Form.Control type="text" value={currentUser} className="customFieldTIC" />
                      </div>

                      {/* DRIVER */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Driver:</h6>
                        <Form.Control type="text" value={'davy mercado'} className="customFieldTIC " />
                      </div>

                      {/* VEHICLE */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Vehicle:</h6>
                        <Form.Control type="text"  readOnly value={''} className="customFieldTIC" />
                      </div>

                      {/* CURRENT MILEAGE */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Current Milage:</h6>
                        <Form.Control type="text"  readOnly value={''} className="customFieldTIC" />
                      </div>

                      {/* BOUND TO */}
                      <div className="alignCenterTIC">
                        <h6 className="noMargMHP">Bound to:</h6>
                        <Form.Control type="text" readOnly value={''} className="customFieldTIC" />
                      </div>

                      {/* TIME OF INSPECTION */}
                      <div className="alignCenterTIC2  mb-2">
                        <h6 className="noMargMHP mb-2">Time of Inspection:</h6>
                        <Form.Control type="text"  readOnly value={''} className="customFieldTIC" />
                      </div>

                      {/* DATE OF INSPECTION */}
                      <div className="alignCenterTIC2">
                        <h6 className="noMargMHP mb-2">Date of Inspection:</h6>
                        <div className="alignCenterTIC1">
                          <Form.Select
                            id="month"
                            onChange={handleMonthChange}
                            className="fieldBorder"
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

                          <Form.Select id="day" className="fieldBorder">
                            <option value="">Day</option>
                            {[...Array(daysInMonth)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </Form.Select>

                          <Form.Select id="MART" className="fieldBorder">
                            <option>Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>

                      {/* DATE OF TRAVEL */}
                      <div className="alignCenterTIC2">
                        <h6 className="noMargMHP mb-2">Date of Travel:</h6>
                        <div className="alignCenterTIC1">
                          <Form.Select
                            id="month"
                            onChange={handleMonthChange}
                            className="fieldBorder"
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

                          <Form.Select id="day" className="fieldBorder">
                            <option value="">Day</option>
                            {[...Array(daysInMonth)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </Form.Select>

                          <Form.Select id="MART" className="fieldBorder">
                            <option>Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>

                      <div className="alignment1 mt-2">
                        <Button type="submit" className="customButonMHP">
                          Download File
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>

                {/* RIGHT SIDE */}
                <Col>
                  <div className="scrollableDiv1 p-4">
                    <div className="alignment1">
                      <h6 className="customFont3 mb-1">THINGS TO CHECK</h6>
                    </div>

                    {/* DOCUMENTS */}
                    <div>
                      <h6 className="customFont2">Documents</h6>
                      <p className="noMargMHP">Duly Signed Trip Ticket</p>
                      <p className="noMargMHP">Drivers Licencse</p>
                      <p className="noMargMHP">Photocopy of Vehicle OR/CR</p>
                    </div>

                    {/* VEHICLE ITEMS */}
                    <div>
                      <h6 className="customFont2">Vehicle Items</h6>
                      <div className="scrollableDiv">
                        <p className="noMargMHP">Brake</p>
                        <p className="noMargMHP">Head Lamp</p>
                        <p className="noMargMHP">Tail and Signal Light</p>
                        <p className="noMargMHP">Brake Light</p>
                        <p className="noMargMHP">Horn</p>
                        <p className="noMargMHP">
                          Fluid Levels (Oil, Water, Transmission Fluid)
                        </p>
                        <p className="noMargMHP">Windshield Including Wiper</p>
                        <p className="noMargMHP">Side Mirrors</p>
                        <p className="noMargMHP">Drum Bolts</p>
                        <p className="noMargMHP">Tire Thickness</p>
                        <p className="noMargMHP">Tire Pressure</p>
                      </div>
                    </div>

                    {/* ADDITIONAL */}
                    <div>
                      <h6 className="customFont2">Additional</h6>
                      <div className="scrollableDiv">
                        <p className="noMargMHP">First Aid Kit</p>
                        <p className="noMargMHP">Fire Extinguisher</p>
                        <p className="noMargMHP">Flashlight</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PostTripInspectionModal;
