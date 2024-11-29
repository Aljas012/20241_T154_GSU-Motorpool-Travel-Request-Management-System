import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";

const ViewATTModal = ({ show, handleClose, imgUrl }) => {
  // Function to check if file is PDF
  const isPDF = (url) => {
    return url?.toLowerCase().endsWith('.pdf');
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            color: "#CD8800",
          }}
        >
          Authority to Travel
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
                {imgUrl ? (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '60vh'
                  }}>
                    {isPDF(imgUrl) ? (
                      <object
                        data={imgUrl}
                        type="application/pdf"
                        style={{
                          width: '100%',
                          height: '70vh'
                        }}
                      >
                        <embed
                          src={imgUrl}
                          type="application/pdf"
                          style={{
                            width: '100%',
                            height: '70vh'
                          }}
                        />
                        <p>This browser does not support PDFs. Please download the PDF to view it: 
                          <a href={imgUrl}>Download PDF</a>
                        </p>
                      </object>
                    ) : (
                      <img 
                        src={imgUrl} 
                        alt="Authority to Travel Document" 
                        style={{
                          maxWidth: '100%',
                          maxHeight: '70vh',
                          objectFit: 'contain'
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '2rem',
                    color: '#666'
                  }}>
                    No document available
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ViewATTModal;