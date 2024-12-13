import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import ReactLoading from "react-loading";

const ViewATTModal = ({ show, handleClose, imgUrl }) => {
  const isPDF = (url) => {
    return url?.toLowerCase().endsWith('.pdf');
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="xl"
      centered
      dialogClassName="modal-no-radius modal-no-scrollbar"
    >
      <Modal.Header 
      
        style={{ borderRadius: 0 }}
      >
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
      <Modal.Body style={{ borderRadius: 0, padding: 0 }}>
        <Row className="mt-3">
          <Col>
            <Card
              style={{
             
                maxHeight: "70vh",
                borderRadius: 0,
                margin: 0,
              }}
            >
              <Card.Body style={{ padding: '1rem' }}>
                {imgUrl ? (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '60vh',
                    overflow: 'hidden'
                  }}>
                    {isPDF(imgUrl) ? (
                      <object
                        data={imgUrl}
                        type="application/pdf"
                        style={{
                          width: '100%',
                          height: '70vh',
                          overflow: 'hidden'
                        }}
                      >
                        <embed
                          src={imgUrl}
                          type="application/pdf"
                          style={{
                            width: '100%',
                            height: '70vh',
                            overflow: 'hidden'
                          }}
                        />
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh'
                  }}>
                    <ReactLoading 
                      type="bubbles" 
                      color="#CD8800" 
                      height={100} 
                      width={100} 
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

const styles = `
  .modal-no-radius .modal-content {
    border-radius: 0;
  }
  
  .modal-no-scrollbar .modal-content {
    overflow: hidden;
  }
  
  .modal-no-scrollbar .modal-body {
    overflow: hidden;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ViewATTModal;