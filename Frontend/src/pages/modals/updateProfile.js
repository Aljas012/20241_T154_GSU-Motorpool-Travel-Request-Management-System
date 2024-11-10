import React from "react";
import { useState } from "react";
import { Button, ToggleButton } from "react-bootstrap";



const updateProfile = () =>
{
  const [modal,setModal] = useState(false);
  
  const ToggleModal = () =>
  {
    setModal(!modal)
  }

  

    return(
         <>
            <button onClick={ToggleModal}  className="saveButton">update user info</button> //button to view the modal content

            <div className="modal">
                  <div className="overlay"></div>
                  <div className="modal-content">
                  <Form>
                    <Form.Group
                      className="mb-3 d-flex align-items-center"
                      controlId="MART"
                    >
                      <Form.Label
                        style={{ minWidth: "100px", marginRight: "10px" }}
                      >
                        Name:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="NAME SA USER MART"
                        style={{ width: "15rem" }}
                        className="ms-auto"
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 d-flex align-items-center"
                      controlId="MART"
                    >
                      <Form.Label>Email address:</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="EMAIL SA USER MART"
                        style={{ width: "15rem" }}
                        className="ms-auto"
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 d-flex align-items-center"
                      controlId="MART"
                    >
                      <Form.Label>Office Code:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="OFFICE CODE SA USER MART"
                        style={{ width: "15rem" }}
                        className="ms-auto"
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 d-flex align-items-center"
                      controlId="MART"
                    >
                      <Form.Label>College of:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="OFFICE CODE SA USER MART"
                        style={{ width: "15rem" }}
                        className="ms-auto"
                        autoFocus
                      />
                    </Form.Group>
                        <Button type="submit"  style={{backgroundColor: "#CD8800",width: "15rem",fontFamily: "Helvetica",}}variant="primary">update information</Button>
                  </Form>

                  </div>
            </div>
        </>
    )


  };