import React, { useState,useEffect } from "react";
import { Modal, Row, Col, Card, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ReactLoading from 'react-loading';
import { ClipLoader } from 'react-spinners';

const DriversListModal = ({ driverShow, driverClose, customStyles }) => {

  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchDriverList = async () => {
    setIsDataLoading(true);
    
 const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
 const token = adminInfo.admin_token;
    try {
      const response = await fetch('http://localhost:8000/admin/get_all_drivers',{
        method:'GET',
        headers:{
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.log('response not okay. may due to no drivers are stored in the db')
      }
      const data = await response.json();
      setDriverInformationData(data);
    } catch (error) {
      setShowErrorModal(true)     
      setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
      setErrorColor('white')
      setErrorDiv(danger)
      setErrorMessage('Something went wrong. Please check your internet connection.')
    } finally {
      setIsDataLoading(false);
    }
  }

 useEffect(() => {
  fetchDriverList();
  }, []);


  
   const [errorModal,setShowErrorModal] = useState(false)
        const [errorMessage,setErrorMessage] = useState('')
        const [errorColor,setErrorColor] = useState('')
        const [errorIcon,setErrorIcon] = useState('')
        const [errorDiv,setErrorDiv] = useState('')
        const warning = '#FCC737'
        const danger = '#C63C51'
        const success = '#6EC207'
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalImage,setModalImage] = useState('')
  const [buttonColor,setButtonColor] = useState('')
  const [driverInformationData, setDriverInformationData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [conditionModal,setConditionModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showAddDriverModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showUpdateDriverModal, setShowUpdateDriverModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    
    driverName: "",
    status: "",
    contactInformation: "",
  });

  const [driverToEdit, setDriverToEdit] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value.toUpperCase(),
    }));
  };





  const handleAddDriver = async () => {
    const adminInfo = localStorage.getItem("admin")
    setIsClicked(true)
    setLoading(true)
    if (!newDriver.driverName || !newDriver.contactInformation) {
      
      setShowErrorModal(true)
      setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734241668/warning-sign_ajxpqp.png')
      setErrorColor('white')
      setErrorDiv(warning)
      setErrorMessage('Input cannot be empty! Please complete all required fields before proceeding.')
      setIsClicked(false)
      setLoading(false)
      return;
    }

    const data = {
      driverName: newDriver.driverName,
      contactInformation: newDriver.contactInformation,
    };
  
    try {
      const response = await fetch('http://localhost:8000/admin/add_driver', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong while processing your request.')
        setIsClicked(false)
        setLoading(false)
        return;
      }
      setShowErrorModal(true)
      setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734277000/check_jmj8om.png')
      setErrorColor('white')
      setErrorDiv(success)
      setErrorMessage('Driver added successfully!')
      setIsClicked(false)
     setLoading(false)
    } catch (error) {
      setShowErrorModal(true)     
      setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
      setErrorColor('white')
      setErrorDiv(danger)
      setErrorMessage('Something went wrong. Please check your internet connection.')
      setIsClicked(false)
      setLoading(false)
      return;
    }

    setDriverInformationData((prevData) => [...prevData, newDriver]);
    setNewDriver({ driverName: "", status: "", contactInformation: "" }); // Clear form
    setShowModal(false); // Close the modal
  };


  const handleDeleteDriver = async (index) => {
    const driverToDelete = driverInformationData[index];
    setConditionModal(false); 
      
      const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
      const token = adminInfo.admin_token;

      try{
        const response = await fetch(`http://localhost:8000/admin/delete_driver/${driverToDelete._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        const result  = await response.json();
        if(!response.ok)
           {
            setShowErrorModal(true)     
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
            setErrorColor('white')
            setErrorDiv(danger)
            setErrorMessage('Something went wrong while processing your request.')
        }
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734277000/check_jmj8om.png')
        setErrorColor('white')
        setErrorDiv(success)
        setErrorMessage('Successful deletion of driver.')
        const updatedData = driverInformationData.filter((_, i) => i !== index);
        setDriverInformationData(updatedData); 
      }catch(error)
      {
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
      }

  
    
  };

  // Function to handle driver edit
  const handleEditDriver = async (index) => {

    const driverToEdit = driverInformationData[index];
    setDriverToEdit(driverToEdit);
    setShowUpdateDriverModal(true); 
  };

  // Function to update driver information
  const handleUpdateDriver = async () => {
    const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
    const token = adminInfo.admin_token;
    setIsClicked(true)
    setLoading(true)

    if (
      driverToEdit.driverName &&
      driverToEdit.contactInformation
    ) {
      const data = {
        driverId: driverToEdit._id,
        driverName: driverToEdit.driverName,
        contactInformation: driverToEdit.contactInformation,
      };
  
      try {
        const response = await fetch('http://localhost:8000/admin/update_driver', {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          setShowErrorModal(true)     
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
          setErrorColor('white')
          setErrorDiv(danger)
          setErrorMessage('Something went wrong while processing your request.')
          setIsClicked(false)
          setLoading(false)
          return;
        }
  
        setShowErrorModal(true)
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734277000/check_jmj8om.png')
        setErrorColor('white')
        setErrorDiv(success)
        setErrorMessage("Driver's information has been successfully updated..")
        setIsClicked(false)
        setLoading(false)
      
        const updatedData = driverInformationData.map((driver) =>
          driver.driverName === driverToEdit.driverName ? driverToEdit : driver
        );
       
        await fetchDriverList();
        setShowUpdateDriverModal(false); 
        setDriverToEdit(null); 
        
      } catch (error) {
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
        setIsClicked(false)
        setLoading(false)
        return;
      }
    } else {
      setShowErrorModal(true)    
      setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
      setErrorColor('white')
      setErrorDiv(danger)
      setErrorMessage('Something went wrong while processing your request.')
      setIsClicked(false)
      setLoading(false)
    }
  };
  
 

  const driverInformationColumns = [
    {
      name: "Name",
      selector: (row) => row.driverName,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Contact Information",
      selector: (row) => row.contactInformation,
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div>
          <img
            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732374171/deleteIcon.svg"
            alt="Delete"
            style={{
              height: "1.5rem",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={() =>{
              setDeleteIndex(index);
              setConditionModal(true) }}
          />

          <img
            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732375408/editIcon.svg"
            alt="Edit"
            style={{
              height: "1.5rem",
              cursor: "pointer",
            }}
            onClick={() => handleEditDriver(index)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];



      const addDriver = async () =>
        {
          setIsClicked(true)
          setLoading(true)
          const data  = {driverName,status,contactInformation};

          try{
                  const response  = await fetch('http://localhost:8000/admin/add_driver',{  
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  if(!response.ok)
                  {
                    setShowErrorModal(true)    
                    setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
                    setErrorColor('white')
                    setErrorDiv(danger)
                    setErrorMessage('Something went wrong while processing your request.')
                    return;
                  }
          }catch(error)
           {
            setShowErrorModal(true)     
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
            setErrorColor('white')
            setErrorDiv(danger)
            setErrorMessage('Something went wrong. Please check your internet connection.')

              ;
          }



      }



  return (
    <>
      <Modal show={errorModal} centered>
                          <Modal.Body style={{ backgroundColor: errorColor,
                           borderRadius: '0px', display: 'flex', justifyContent: 'center',
                           alignItems: 'center',flexDirection: 'column',padding: 0,}}>
                          <img src={errorIcon} alt="no internet" height="60px" width="60px" draggable={false} style={{marginBottom: "1.5em",marginTop:'2rem'}}/>
                           <p style={{color: 'black',textAlign:'center',margin:'.5rem'}}>{errorMessage}</p>
                          <div style={{display:'flex',backgroundColor:errorDiv,width:'100%',  padding: '10px',marginTop:'1em',justifyContent:'center'}}>
                          <button style={{ backgroundColor: 'transparent',border:'none',margin:'.8em',color:'white'}} onClick={()=>setShowErrorModal(false)}> DISMISS </button>
                          </div>
                          </Modal.Body>
                   </Modal>
    <Modal
      show={driverShow}
      onHide={driverClose}
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
          Driver's Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1" }}>
              <Card.Body>
                {isDataLoading ? (
                  <div className="loading-container">
                    <ReactLoading 
                      type="spokes" 
                      color="#CD8800" 
                      height={50} 
                      width={50} 
                      style={{alignItems:'center'}}
                    />
                    <p style={{ marginTop: '10px', color: '#666' }}>Loading drivers...</p>
                  </div>
                ) : (
                  <DataTable
                    columns={driverInformationColumns}
                    data={driverInformationData}
                    customStyles={customStyles}
                    highlightOnHover
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                  />
                )}
                <div>
                  <button
                    className="customButtonDriver"
                    onClick={() => setShowModal(true)}
                  >
                    <div className="addDriverIconAlignment">
                      <img
                        src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732374171/addIcon.svg"
                        alt="icon"
                        style={{ height: "1.8rem" }}
                      />
                    </div>
                    Add new Driver
                  </button>
                </div>

                {/* Modal for adding new driver */}
                <Modal
                  show={showAddDriverModal}
                  onHide={() => setShowModal(false)}
                  
                >
                  <Modal.Header
                    closeButton
                    style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Modal.Title
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        color: "#CD8800",
                      }}
                    >
                      Add New Driver
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col>
                        <Card style={{ backgroundColor: "#F1F1F1" }}>
                          <Card.Body>
                            <Form>
                              <Form.Group
                                className="mb-2"
                                controlId="driverName"
                              >
                                <Form.Label>Driver Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="driverName"
                                  style={{ border: "1px solid #00000066" }}
                                  value={newDriver.driverName}
                                  onChange={handleInputChange}
                                  placeholder="Enter driver's name"
                                />
                              </Form.Group>

                     
                              <Form.Group controlId="contactInformation">
                                <Form.Label>Contact Information</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="contactInformation"
                                  style={{ border: "1px solid #00000066" }}
                                  value={newDriver.contactInformation}
                                  onChange={handleInputChange}
                                  placeholder="Enter driver's contact"
                                />
                              </Form.Group>
                            </Form>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      disabled={isClicked}
                      className="d-flex justify-content-center align-items-center" 
                      style={{   width: "100px", height: "40px", }} 
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                    <Button variant="primary"   className="d-flex justify-content-center align-items-center"  onClick={handleAddDriver} disabled={isClicked}
                      style={{  width: "130px", height: "40px"}} >
                    {isClicked ? ( <ReactLoading type="spokes" color="#fff" height={20} width={20} display="flex" alignItems="center" justifyContent= "center" position= "relative" />) : ( "Add Driver" )} 
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={showUpdateDriverModal}
                  onHide={() => {
                    setShowUpdateDriverModal(false);
                    setDriverToEdit(null); // Clear the driver to edit when modal closes
                  }}
                
                >
                  <Modal.Header
                    closeButton
                    style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Modal.Title
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        color: "#CD8800",
                      }}
                    >
                      Update Driver Information
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col>
                        <Card style={{ backgroundColor: "#F1F1F1" }}>
                          <Card.Body>
                            <Form>
                              <Form.Group
                                className="mb-2"
                                controlId="driverName"
                              >
                                <Form.Label>Driver Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="driverName"
                                  style={{ border: "1px solid #00000066" }}
                                  value={driverToEdit?.driverName || ""}
                                  onChange={(e) =>
                                    setDriverToEdit({
                                      ...driverToEdit,
                                      driverName: e.target.value,
                                    })
                                  }
                                  placeholder="Enter driver's name"
                                />
                              </Form.Group>

                              

                              <Form.Group controlId="contactInformation">
                                <Form.Label>Contact Information</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="contactInformation"
                                  style={{ border: "1px solid #00000066" }}
                                  value={driverToEdit?.contactInformation || ""}
                                  onChange={(e) =>
                                    setDriverToEdit({
                                      ...driverToEdit,
                                      contactInformation: e.target.value,
                                    })
                                  }
                                  placeholder="Enter driver's contact"
                                />
                              </Form.Group>
                            </Form>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer> 
                    <Button
                      variant="secondary"
                      disabled={isClicked}
                      className="d-flex justify-content-center align-items-center" 
                      style={{  width: "100px", height: "40px", }} 
                      onClick={() => setShowUpdateDriverModal(false)}
                    >
                      Close
                    </Button>
                    <Button variant="primary"  disabled={isClicked}  style={{  width: "130px", height: "40px"}}  onClick={handleUpdateDriver}  className="d-flex justify-content-center align-items-center" >
                      {isClicked ? ( <ReactLoading type="spokes" color="#fff" height={20} width={20} display="flex" alignItems="center" justifyContent= "center" position= "relative" />) : ( "Update driver" )}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>




    <Modal show={conditionModal} centered size="sm" animation={true}>
        <Modal.Body
          style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', color: '#721c24' }}
        >
          <h4>Are you sure you want to delete ? </h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
            <Button
              variant="danger"
              className="d-flex justify-content-center align-items-center" 
              onClick={() => setConditionModal(false)} // Close the modal
              style={{  width: "100px", height: "40px", borderRadius: '5px' }}
            >
              Cancel
            </Button>
            
            <Button
              variant="primary"
              disabled={isClicked} 
              className="d-flex justify-content-center align-items-center" 
              onClick={() => {
                setConditionModal(false); 
                handleDeleteDriver(deleteIndex); // Trigger deletion
              // Close modal after deletion
                
              }}
              style={{  width: "100px", height: "40px", borderRadius: '5px' }}
            >
            {isClicked ? ( <ReactLoading type="spokes" color="#fff" height={20} width={20} display="flex" alignItems="center" justifyContent= "center" position= "relative" />) : ( "Continue" )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>











   <Modal show={modalIsOpen}
   onHide={() => setModalIsOpen(false)}
   centered
   size="sm"
   animation={true}
 >
   <Modal.Body
     style={{
       textAlign: 'center',  
       padding: '20px',
       backgroundColor: 'white',
       color: '#721c24',
       display: 'flex', // Make Modal.Body a flex container
       flexDirection: 'column', // Stack children vertically
       justifyContent: 'center', // Center children vertically
       alignItems: 'center', // Center children horizontally
     }}
   >

     {modalImage && <img src={modalImage} alt="Modal Image" style={{ width: '50px', height: '50px', marginBottom: '20px', borderRadius: '8px' }} />}
     
     <p style={{fontSize:".9rem"}}>{modalMessage}</p>
     <Button
       variant= {buttonColor}
       onClick={() => setModalIsOpen(false)}

       className="d-flex justify-content-center align-items-center" 
       style={{
         marginTop: '15px',
         width: "90px",
          height: "35px",
         borderRadius: '5px',
       }}
     >
  Continue
     </Button>
   </Modal.Body>
 </Modal>
 </>
  );
  
};

export default DriversListModal;
