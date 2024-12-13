import React, { useState, useEffect } from "react";
import ReactLoading from 'react-loading';
import { Container, Row, Col, Card, Form, Button, Modal, ModalBody, ModalHeader, Spinner } from "react-bootstrap";
import { useParams,useNavigate } from 'react-router-dom';
import NavbarComponent from "../../components/NavbarComponent.jsx";
import "../MOTORPOOL/MotorpoolHomePage.css";
import HeadApprovedRTT from "../../components/HeadApprovedRTT.jsx";
import HeadApprovedDTT from "../../components/HeadApprovedDTT.jsx";



function HeadFinalApproved() {
  /** VIEW APPROVED RTT MODAL FUNC */
  const [ApprovedRTTShow, setApprovedViewRTTModalShow] = useState(false);
  const viewHeadApprovedRTTModalClose = () =>
    setApprovedViewRTTModalShow(false);
  const viewHeadApprovedRTTModalShow = () => setApprovedViewRTTModalShow(true);

  /** VIEW APPROVED DTT MODAL FUNC */
      const [ApprovedDTTShow, setApprovedViewDTTModalShow] = useState(false);
      const viewHeadApprovedDTTModalClose = () =>
     setApprovedViewDTTModalShow(false);
      const viewHeadApprovedDTTModalShow = () => setApprovedViewDTTModalShow(true);
      const [showModal, setShowModal] = useState(false);
      const [action, setAction] = useState('');
      const [declineButton,setDeclineButton] = useState(false)
      const [approvedButton,setApprovedButton] = useState(false)
      const [sendButton,setSendButton] = useState(true)
      const [approvedMessage,setApprovedMessage] = useState('');
      const [loading,setLoading] = useState (false)
      const { requestId,userId } = useParams();
      const navigate = useNavigate();
      const [responseMessage,setResponseMessage] = useState('')
      const [reponseModal,setResponseModal] = useState(false)
      const [responseIcon,setResponseIcon] = useState('')
      const [errorDiv,setErrorDiv] = useState('')
      const warning = '#FCC737'
      const danger = '#C63C51'
      const success = '#72BF78'


      const handleClose = () => {
        setShowModal(false);
        setAction('');
      };

      const declineHandler = () => {
        setAction('decline');
        setShowModal(true);
      };

      const approvedHandler = () => {
        setAction('approve');
        setShowModal(true);
      };

      const sendHandler = () => {
        setAction('send');
        setShowModal(true);
      };

      const conditionModal = () => {
                  switch(action) {
                            case 'send':
                              approvedRequesthandler();
                              break;
                            case 'decline':
                             removeRequest();
                              break;
                            case 'approve':
                              setApprovedButton(true)
                              setDeclineButton(true)
                              setSendButton(false)
                              break;
                            default:
                              alert('No action specified');
                  }
        handleClose();
      };

              const removeRequest = async () =>
                  {
                        const data = {requestId};
                        let cooldown = 5;
                        setLoading(true);
                      try{
                          const response  = await fetch ('http://localhost:8000/admin/decline_request',
                                { 
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                })
                                if(!response.ok)
                                    {
                                        setLoading(false)
                                        setResponseModal(true)
                                        setErrorDiv(danger)
                                        setResponseIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png')
                                        setResponseMessage('Something went wrong in the backend')
                                        return;
                                    }
                                    
                                    setLoading(false);
                                    setResponseModal(true)
                                    setErrorDiv(success)
                                    setResponseIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png')
                                    let countdown = cooldown;
                                    setResponseMessage(`You have successfully deleted the request. We will redirect you to home page in ${countdown}.`)
                                    const interval = setInterval(() => {
                                      countdown -= 1;
                                      setResponseMessage(`You have successfully deleted the request. We will redirect you to home page in ${countdown}.`)
                                    if (countdown <= 0) {
                                      clearInterval(interval);
                                      navigate('/admin/head_homepage');
                                    }
                                  }, 1000);
                      }catch(error) 
                      {
                        setLoading(false);
                        setResponseModal(true)
                        setErrorDiv(success)
                        setResponseIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png')
                        setResponseMessage('Something went wrong! Please check your internet connection.')
   } }





        const approvedRequesthandler = async () =>
           {
            const data  = {requestId};
            let cooldown = 5;
                  try
                  {
                    const approveResponse  = await fetch('http://localhost:8000/admin/head_approve_admin_request',
                          {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                          } )

                          if(!approveResponse.ok)
                                {
                                  setLoading(false)
                                  setResponseModal(true)
                                  setErrorDiv(danger)
                                  setResponseIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png')
                                  setResponseMessage('Something went wrong in the backend')
                                  return;
                          }
                       
                          setApprovedMessage('Request has been approved')
                          setLoading(false);
                          setResponseModal(true)
                          setErrorDiv(success)
                          setResponseIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png')
                          let countdown = cooldown;  // Ensure 'cooldown' is properly defined
                          setResponseMessage(`You have successfully approved the request. Redirecting in ${countdown} seconds...`);
                      
                          const interval = setInterval(() => {
                            countdown -= 1;
                            setResponseMessage(`You have successfully approved the request. Redirecting in ${countdown} seconds...`);
                      
                            // Once countdown reaches 0, clear the interval and navigate
                            if (countdown <= 0) {
                              clearInterval(interval);
                              navigate('/admin/head_homepage');
                            }
                          }, 1000); // Interval set to 1000ms (1 second)

                  }catch(error)
                  {
                    console.error('Fetch failed:', error);
                    setLoading(false);
                    setResponseModal(true)
                    setErrorDiv(danger)
                    setResponseIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                    setResponseMessage('Something went wrong! Please check your internet connection.')
                  }
          }


  return (
    <>
      <NavbarComponent />

      <main>
        <Container>
          <Row style={{ height: "100vh" }}>
            <Col>
              <Card className="mt-4" style={{ backgroundColor: "#f2f2f2" }}>
                <Card.Body>
                  <div>
                    <div className="lineBorderVR1 alignmentFA">
                      <div>
                        <a
                          className="customA3 alignment2"
                          onClick={viewHeadApprovedRTTModalShow}
                        >
                          <h5 className="customH5Request">
                            View Approved RTT Information
                          </h5>
                        </a>
                      </div>
                    </div>

                    <div className="lineBorderVR1 alignmentFA">
                      <div>
                        <a
                          className="customA3 alignment2"
                          onClick={viewHeadApprovedDTTModalShow}
                        >
                          <h5 className="customH5Request">
                            View Approved DTT Information
                          </h5>
                        </a>
                      </div>
                    </div>

                    <div className="lineBorderVR1 alignmentFA">
                      <div style={{ width: "98%" }}>
                        <Card style={{ border: "1px solid gray" }}>
                          <Card.Body>
                            <div>
                              <h5 className="customHeadHeader">
                                GSU Head Approval
                              </h5>

                              <div className="alignmentHead2">
                                <Form.Control
                                  className="customFormHead"
                                  value= "KRISTINE RIVI GEWAN"
                                 disabled
                                  style={{
                                    textAlign: "center",
                                    width: "30%",
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                  }} 
                                />
                                <div className="alignmentHead">
                                  <Button
                                    className="CustomButtonHead"
                                    style={{ backgroundColor: "green" }}
                                    onClick={approvedHandler}
                                    disabled ={approvedButton}
                                  >
                                    APPROVE
                                  </Button>
                                  <Button
                                    className="CustomButtonHead"
                                    style={{ backgroundColor: "red" }}
                                    onClick={declineHandler}
                                    disabled = {declineButton}
                                  > 
                                    DECLINE
                                  </Button>
                                </div>

                                <Button className="CustomButtonHead1" onClick={sendHandler} disabled={sendButton}>
                                  SEND
                                </Button>
                              </div>

                              {/* Acknowledgment section */}
                              <div className="acknowledgment">
                                <h6><span style={{color: 'green'}}> {approvedMessage}</span></h6>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>  
                    </div>
                  </div>
                </Card.Body>
              </Card>

                    <Modal  show={showModal} onHide={handleClose} centered dialogClassName="modal-no-radius">
                                <Modal.Body    style={{textAlign: 'center', padding: '2rem', display: 'flex',flexDirection: 'column',gap: '1.5rem'}}>
                                  <h4 
                                  style={{ marginBottom: '1rem',  fontSize: '1.2rem', fontWeight: '500',marginTop:'1.5rem'}}>
                                    Are you sure you want to {action}?
                                  </h4>
                                            <div   style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                                      <Button
                                                        variant="danger"   onClick={handleClose}
                                                        style={{  padding: '0.5rem 1.5rem', fontWeight: '500',  width: '120px' }} >
                                                        Cancel
                                                      </Button>
                                                      <Button  variant="success"  onClick={conditionModal}
                                                        style={{  padding: '0.5rem 1.5rem',    fontWeight: '500',  width: '120px' }}  >
                                                        Continue
                                                      </Button>
                                            </div>
                                </Modal.Body>
                  </Modal>

                  <Modal  show={loading} onHide={handleClose} centered dialogClassName="modal-no-radius" >
                                <Modal.Body    style={{textAlign: 'center', padding: '2rem', display: 'flex',flexDirection: 'column',gap: '1.5rem',alignItems:'center',justifyContent:'center'}}>
                                <div style={{ margin: '2rem 0' }}>
                                      <ReactLoading type="spinningBubbles"color="black" height={'60px'} width={'60px'} />
                                </div>
                                            <div   style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                                   <h6>Loading Please wait . . . </h6>
                                            </div>
                                </Modal.Body>
                  </Modal>



                        <Modal show={reponseModal} centered dialogClassName="modal-no-radius">
                            <Modal.Body style={{
                              textAlign: 'center',
                              padding: '2rem 0 0 0',  // Remove bottom padding
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1.5rem',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <div style={{ margin: '2rem 0' }}>
                                <img 
                                  src={responseIcon} 
                                  height="50px" 
                                  width="50px" 
                                  alt="404 not found" 
                                  draggable={false} 
                                />
                              </div>
                              
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: '1rem' 
                              }}>
                                <h5>{responseMessage}</h5>
                              </div>
                              
                              <div style={{
                                width: '100%',  // Full width
                                backgroundColor: errorDiv,
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 0,  // No bottom margin
                                marginTop: '1rem'
                              }}>
                                <button style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  color: 'white',
                                  padding: '0.5rem 1rem',
                                  cursor: 'pointer'
                                }} 
                                onClick={() =>setResponseModal(false)}
                                > 
                                  DISMISS 
                                </button>
                              </div>
                            </Modal.Body>
                </Modal>


              





            </Col>
          </Row>

          {/** VIEW HEAD APPROVED RTT MODAL */}
          <HeadApprovedRTT
            viewHeadApprovedRTTModalShow={ApprovedRTTShow}
            viewHeadApprovedRTTModalClose={viewHeadApprovedRTTModalClose}
          />

          {/** VIEW HEAD APPROVED DTT MODAL */}
          <HeadApprovedDTT
            viewHeadApprovedDTTModalShow={ApprovedDTTShow}
            viewHeadApprovedDTTModalClose={viewHeadApprovedDTTModalClose}
          />
        </Container>
      </main>
    </>
  );
}

export default HeadFinalApproved;
