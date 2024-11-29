import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import downloadIcon from "../ASSETS/downloadIcon.svg";

const FinalApprovalModal = ({ finalShow, finalClose }) => {
  return (
    /** FINAL APPROVAL MODAL */
    <Modal
      show={finalShow}
      onHide={finalClose}
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
          Final Approval
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1" }}>
              <Card.Body>
                <div className="mb-4 mt-3 lineBorder">
                  <div style={{ width: "22vw" }}>
                    <a className="customA3 alignment2">
                      <h5 style={{ margin: 0 }}>View ATT Information</h5>
                      <img
                        src={downloadIcon}
                        alt="asd"
                        className="customIcon2"
                      />
                    </a>
                  </div>
                </div>

                <div className="mb-4 lineBorder">
                  <div style={{ width: "22vw" }}>
                    <a className="customA3 alignment2">
                      <h5 style={{ margin: 0 }}>View RTT Information</h5>
                      <img
                        src={downloadIcon}
                        alt="asd"
                        className="customIcon2"
                      />
                    </a>
                  </div>
                </div>

                <div className="mb-4 lineBorder">
                  <div style={{ width: "40vw" }}>
                    <a className="customA3 alignment2">
                      <h5 style={{ margin: 0 }}>
                        View RTT Information (Approved Motorpool & GSU Head)
                      </h5>
                      <img
                        src={downloadIcon}
                        alt="asd"
                        className="customIcon2"
                      />
                    </a>
                  </div>
                </div>

                <div className="mb-4 lineBorder">
                  <div style={{ width: "42vw" }}>
                    <a className="customA3 alignment2">
                      <h5 style={{ margin: 0 }}>
                        View Driver's Trip Ticket (Approved Motorpool & GSU
                        Head)
                      </h5>
                      <img
                        src={downloadIcon}
                        alt="asd"
                        className="customIcon2"
                      />
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default FinalApprovalModal;
