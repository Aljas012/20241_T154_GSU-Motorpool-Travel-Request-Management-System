// AdminGuideModal.jsx
import React from 'react';
import { Modal, Row, Col, Card } from 'react-bootstrap';
import eIcon from '../ASSETS/Circle.svg'; // Update the path to the icon image

const AdminGuideModal = ({ guideShow, guideClose }) => {
  return (
    <Modal
      show={guideShow}
      onHide={guideClose}
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
          Admin Guide
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1" }}>
              <Card.Body className="d-flex">
                <Col>
                  <div>
                    <div>
                      <div className="alignmentMHP4">
                        <div className="image-container">
                          <img src={eIcon} alt="icon" />
                          <span className="centered-number">1</span>{" "}
                        </div>

                        <h6 className="noMargMHP">Receipt of Documents</h6>
                      </div>
                      <div style={{ marginLeft: "3rem", marginTop: "1rem" }}>
                        <ul className="custom-bullets">
                          <li>
                            Receive ATT and RTT forms from Bukidnon State
                            University's offices
                          </li>
                          <li>
                            Verify that all submitted forms are properly filled
                            out by the requesting office
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="alignmentMHP4">
                        <div className="image-container">
                          <img src={eIcon} alt="icon" />
                          <span className="centered-number">2</span>{" "}
                        </div>

                        <h6 className="noMargMHP">RTT Form Processing</h6>
                      </div>

                      <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
                        <ul className="custom-bullets">
                          <p>
                            Review the RTT form details, complete the
                            designated Motorpool section of the RTT form,
                            which includes:
                          </p>
                          <div style={{ marginLeft: "3rem" }}>
                            <li>Vehicle Assignments</li>
                            <li>Driver Details</li>
                            <li>Fuel Allocation</li>
                            <li>Maintenance Status</li>
                            <li>Other relevant technical information</li>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <div>
                      <div className="alignmentMHP4">
                        <div className="image-container">
                          <img src={eIcon} alt="icon" />
                          <span className="centered-number">3</span>{" "}
                        </div>

                        <h6 className="noMargMHP">Documents Requirements</h6>
                      </div>

                      <div style={{ marginLeft: "3rem", marginTop: "1rem" }}>
                        <ul className="custom-bullets">
                          <li>
                            Ensure all required fields are properly filled out
                          </li>
                          <li>
                            Make copies of the completed forms for Motorpool
                            records
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginTop: "4rem" }}>
                      <div className="alignmentMHP4">
                        <div className="image-container">
                          <img src={eIcon} alt="icon" />
                          <span className="centered-number">4</span>{" "}
                        </div>

                        <h6 className="noMargMHP">Forwards to GSU Head</h6>
                      </div>

                      <div style={{ marginLeft: "3rem", marginTop: "1rem" }}>
                        <ul className="custom-bullets">
                          <li>
                            Submit the completed RTT form to the GSU Head for
                            review and approval
                          </li>
                          <li>Ensure all attachments are in order</li>
                        </ul>
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

export default AdminGuideModal;
