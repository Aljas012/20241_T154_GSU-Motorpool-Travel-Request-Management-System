import React, { useState,useRef } from "react";
import { Container, Row, Col, Form, Button, InputGroup,Modal, Stack, ModalBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Fixed missing import
import Swal from "sweetalert2";
import "../styles/LandingPage.css";
//import ReCAPTCHA from "react-google-recaptcha";



function UserLandingPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  
  const toggleModal = () => {
    setModal(!modal);
  };

  const alertWindow = () => {
    Swal.fire({
      position: "center-left",
      icon: "error",
      title: "Error!",
      text: "Something went wrong. Please try again later.",
      height:"40px",
      width: "400px",
      customClass: {
        popup: "my-popup", // Custom class for additional styling
        icon: "my-icon",   // Custom class for the icon
      },
      didOpen: () => {
        // You can use inline styling if you prefer
        const icon = document.querySelector(".swal2-icon.swal2-error");
        if (icon) {
          icon.style.width = "30px";  // Adjust the width
          icon.style.height = "30px"; // Adjust the height
        }
      },
    });
  };




  const leftImageStyle = {
    backgroundImage: "url('/images/GSU_BG.png')",
    backgroundSize: "58% 100%",
    backgroundPosition: "left top",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    zIndex: 1,
  };

  const rightImageStyle = {
    backgroundImage: "url('/images/GSUREC_BG.png')",
    backgroundSize: "55% 100%",
    backgroundPosition: "right top",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    right: 0,
    height: "100vh",
    width: "100%",
    zIndex: 2,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 3,
    padding: "20px",
    height: "100%",
  };

  
  const headerStyle = {
    margin: 0,
    fontFamily: "Helvetica",
  };


  const [email, setEmail] = useState(""); // For email input
  const [password, setPassword] = useState(""); // For password input
  const [error, setError] = useState(null); // For handling errors
  
  
  function validateEmail(email) {
    // Define the allowed email domains
    if(email !== "")
    {
    const allowedDomains = ['@buksu.edu.ph', '@student.buksu.edu.ph'];
    const isValid = allowedDomains.some((domain) => email.endsWith(domain));
    return isValid;}
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };
    
            
          if (email === "" || password === "") {
              Swal.fire({
                icon: 'error',
                title: 'null input fields',
                text: 'Please occupy all input fields to',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#FF0000',
              });
              return; 
            }
            
            
    if (!validateEmail(email)) {
      alert('invalid email  -login')
      return; 
    }

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
        
      const json = await response.json();
      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'The email or password you entered is incorrect. Please try again.',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#FF0000',
        });
        return; 
      } else {
        // Clear the form and reset state if login is successful

        setEmail("");
        setPassword("");
        setError(null);
        localStorage.setItem("auth_token", json.token); 
        localStorage.setItem("user_info", JSON.stringify(json.user));
        console.log("email: " + email);
        console.log("password: " + password);
        const userInfo = JSON.parse(localStorage.getItem("user_info")); // Parse the stored JSON
        const id = userInfo.user_id; // Access the correct key for the user ID
        navigate(`/user/id=${id}/homepage`);
      }
    } catch (err) {
      alertWindow();
    }


  };






  //===========================================================================================
  const [forgotEmail, setForgotEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false); // Set to false initially
  const [showPinModal, setShowPinModal] = useState(false);
  const [showChangePassword,setShowNewPassword] = useState(false)
  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const toggleEmailModal = () => setShowEmailModal(!showEmailModal);
  const togglePinModal = () => setShowPinModal(!showPinModal);
  const toggleChangePassword = () => setShowNewPassword(!showChangePassword);


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalImage,setModalImage] = useState('')
  const [modalButton,setModalButton] =useState('')
  const [buttonColor,setButtonColor] = useState('')
  const inputsRef = useRef([]);
  





function notifyModal (imageUrl,message,buttonColor) 
      {
          setModalMessage(message);
          setModalImage(imageUrl);
          setButtonColor(buttonColor);
          setModalIsOpen(true);      
  }


  const handleInputPin = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "")
       {
          const newPin = [...pin];
          newPin[index] = value; 
          setPin(newPin);
      }
    const isEmpty = newPin.some(pinValue => pinValue === ""); 
      setSubmitDisabled(isEmpty)
   };





  

  // const [recaptcha,setRecaptcha] = useState(null)
  // const captchaKey = "6LfKIXsqAAAAABQzfWWmEnNZxRj-KOZRpV3XqIny";

 /**================ EMAIL CHECKER =================== */



 

 function forgotEmailValidator(forgotEmail) {

  if(forgotEmail === "")
      {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118396/warning_1_vj16yl.png')
        setModalMessage('Unable to continue due to null input field')
        setButtonColor('danger')
        setModalIsOpen(true);
        return false;
      }

      const allowedDomains = ['@buksu.edu.ph', '@student.buksu.edu.ph'];
      const isValid = allowedDomains.some((domain) => forgotEmail.endsWith(domain));
      if (!isValid) {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732318636/sensitive-content_m1cqf8.png');
        setModalMessage('Non-Institutional Accounts are not allowed!');
        setButtonColor('warning')
        setModalIsOpen(true);
        return false; // Validation failed
      }
      return true;
}



  const sendEmailHandler = async (e) => {
   
      const isValid =  forgotEmailValidator(forgotEmail)
      if(!isValid) { return; }

      const emailData = { email: forgotEmail };

      try {
        const response = await fetch("http://localhost:8000/user/email_verification", {
          method: "POST",
          body: JSON.stringify(emailData),
          headers: {"Content-Type": "application/json",},
        });

      const json = await response.json();

      if (response.ok) {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732202334/tick_whwxlk.png')
        setModalMessage('202 Successfull: We already sent the verification code to your email '+ forgotEmail)
        setButtonColor('success')
        setModalIsOpen(true);
        setShowEmailModal(false);
        setShowPinModal(true);
        return
      } 
        console.error("Error response:", json);
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732318357/404-error_w1pvfd.png')
        setModalMessage('401 Unauthorized. Email address is not registered!')
        setButtonColor('danger')
        setModalIsOpen(true);
      
        return;
    } catch (error) {
     
      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
      setModalMessage('An unexpected error occurred. Please try again later.');
      setModalIsOpen(true);
    }
  };


  function nullPinHandler (forgotPin) {
        if(forgotPin === "")
          {
            setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118396/warning_1_vj16yl.png')
            setModalMessage('You are almost there! Please complete all required fields to move forward.')
            setButtonColor('warning')
            setModalIsOpen(true); 
            return false;
          }
        if(forgotPin < 6)
            {
              setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118396/warning_1_vj16yl.png')
              setModalMessage('Please input 6 digit pins to continue')
              setButtonColor('danger')
              setModalIsOpen(true); 
              return false;
            }
          return true;
  }





  // Function to handle the PIN verification
  const pinHandler = async () => {

    const forgotPin = inputsRef.current.map((input) => input.value).join("");

    console.log('Forgot pin is '+forgotPin)
    const isValid  = nullPinHandler(forgotPin);
    if(!isValid){return;}

    const data = { forgotPin, forgotEmail };
    alert('forgot email that will be sent to backend is '+ forgotEmail)
    alert('forgot pin that will be sent to backend is '+forgotPin)
    try {
      const response = await fetch('http://localhost:8000/user/verify_code', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732265851/verified_qylqds.png')
        setModalMessage('Great! Your PIN is correct.');
        setButtonColor('success')
        setModalIsOpen(true);
        setShowPinModal(false);
        setShowNewPassword(true)
      } else {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
        setModalMessage('Incorrect Pin!');
        setButtonColor('danger')
        setModalIsOpen(true);
        return;
      }
    } catch (error) {
      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
      setModalMessage('An unexpected error occurred. Please try again later.');
      setModalIsOpen(true);
    }
  };



  //========================== CHANGE PASSWORD HANDLER ====================================


 async function newPasswordValidator (newPassword,confirmPassword)
 {  
        if(confirmPassword !== newPassword) 
        {
          setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
          setModalMessage("Password don't match!");
          setButtonColor('danger')
          setModalIsOpen(true);
          return false;
        }
        return true;
 }




  const changePasswordHandler = async () => {
   
    const isValid = await newPasswordValidator(newPassword, confirmPassword);
  if (!isValid) {
    return;
  }
    
  
    const data = { newPassword, forgotEmail};
    alert(''+forgotEmail)
    try {
      const response = await fetch('http://localhost:8000/user/change_password', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
       
        return;
      } 
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732265851/verified_qylqds.png')
        setModalMessage('Congratulations! Your password has been changed successfully.');
        setButtonColor('success')
        setModalIsOpen(true);
        setShowNewPassword(false)
    } catch (error) {
      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
      setModalMessage('An unexpected error occurred. Please try again later.');
      setModalIsOpen(true);
    }
  };
  
  
  const recaptchaHandler = async () =>
        {
              setRecaptcha(true);
        }



    
  return (
    <Container fluid style={{ position: "relative", height: "100vh" }}>
      <div style={leftImageStyle}></div>
      <div style={rightImageStyle}></div>

      <Row
        style={contentStyle}
        className="justify-content-center align-items-center h-100"
      >
        {/** FIRST COLUMN / LEFT SIDE */}
        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 4, offset: 0 }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <Form id="landingpage" onSubmit={handleSubmit}>
              <h2
                style={{
                  ...headerStyle,
                  color: "#0760A1",
                  fontWeight: 700,
                  fontSize: "2.5rem",
                }}
              >
                BUKSU
              </h2>
              <h2
                style={{
                  ...headerStyle,
                  color: "#0760A1",
                  fontWeight: 700,
                  fontSize: "2.5rem",
                }}
              >
                GSU MOTORPOOL
              </h2>
              <h4
                style={{
                  ...headerStyle,
                  color: "#CD8800",
                  fontWeight: 600,
                  fontSize: "1.75rem",
                }}
              >
                Request Management System
              </h4>{" "}
              
              <h4
                style={{
                  ...headerStyle,
                  color: "#767676",
                  fontWeight: 600,
                  marginTop: "3rem",
                }}
              >
                Sign-in to your account!
              </h4>
              {/** EMAIL INPUT FIELD */}
              <InputGroup className="mb-3 mt-2 input-shadow">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} size="lg" fixedWidth />
                </InputGroup.Text>
                <Form.Control
                  id="email"
                  size="lg"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  autoComplete="current-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </InputGroup>
              {/** PASSWORD INPUT FIELD */}
              <InputGroup className="mb-3 input-shadow">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} size="lg" fixedWidth />
                </InputGroup.Text>
                <Form.Control
                  id="password"
                  size="lg"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </InputGroup>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-100"
              >
                Login
              </Button>
              {/** SIGN IN WITH GOOGLE */}
              <h5
                className="text-center mt-3"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              >
                or sign in with{" "}
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ color: "#FF4B26" }}>G</span>
                  <span style={{ color: "#FFD500" }}>o</span>
                  <span style={{ color: "#12B347" }}>o</span>
                  <span style={{ color: "#0F993E" }}>g</span>
                  <span style={{ color: "#167EE6" }}>l</span>
                  <span style={{ color: "#167EE6" }}>e</span>
                </a>
              </h5>
              {/** FORGOT PASSWORD */}
              <h5
                className="text-center mt-5"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              ></h5>
              {/** FORGOT PASSWORD */}
              <div style={{ textAlign: "center" }}>
                <a
                  href="/admin/AdminLandingPage"
                  style={{
                    textDecoration: "none",
                    display: "block",
                    color: "black",
                    marginBlock: "5px",
                  }}
                >
                  ADMIN LOGIN
                </a>
                <button type="button" class="btn  btn-outline"onClick={toggleEmailModal}>Forgot Password?</button>
              </div>
            </Form>
          </div>
        </Col>



                      
              <Modal show={showEmailModal} onHide={toggleEmailModal} centered>
                <Modal.Header closeButton></Modal.Header>
                  <Modal.Body className="p-2" style={{ padding: "0 24px" }}>
                    {/* Container for Image and Text */}
                    <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                      <img
                        src="https://res.cloudinary.com/dvhfgstud/image/upload/v1732318135/data-search_pezrjr.png"
                        alt="Company Logo"
                        draggable="false"
                        style={{ width: "90px", height: "90px" }}
                      />
                      <h6 className="mt-3">Forgot Password?</h6>
                      <p className="text-center text-muted" style={{ maxWidth: "300px", fontSize: "14px", marginTop: "8px" }}>
                        Enter your email address below, and we'll send you instructions to reset your password.
                      </p>
                    </div>

                    {/* Form Container */}
                    <div style={{ margin: "0 auto", maxWidth: "350px" }}>
                      {/* Form for Email Input */}
                      <Form 
                      onSubmit={(e) => {
                        e.preventDefault()
                        sendEmailHandler()
                      }
                      }>
                        <Form.Group className="mb-3">
                          <InputGroup>
                            <Form.Control
                              type="email"
                              placeholder="Enter your email address"
                              aria-label="Email"
                              className="rounded p-3 mt-2"
                              onChange={(e) => setForgotEmail(e.target.value)}
                              style={{ letterSpacing: ".9px" }}
                            />
                          </InputGroup>
                        </Form.Group>

                        {/* Verify Button */}
                        <Button
                          type="submit"
                          variant="primary"
                          className="w-100 text-white"
                          style={{ padding: "10px 0", fontWeight: "bold" }}
                        >
                          Verify Email
                        </Button>
                      </Form>
                    </div>
                  </Modal.Body>

                  <Modal.Footer className="justify-content-center m-2">
                    Unable to find your account?  <a href="http://localhost:5173/" style={{textDecoration:"none"}}>contact us.</a> 
                  </Modal.Footer>
      </Modal>



      <Modal show={showPinModal} onHide={togglePinModal} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="p-2" style={{ padding: "0 24px" }}>
            
              <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                <img src="https://res.cloudinary.com/dvhfgstud/image/upload/v1732194851/authentication_jdckfv.png"  alt="Company Logo" draggable="false"    style={{ width: "90px", height: "90px" }}/>
                <h6 className="mt-3">Verify your account</h6>
                <p className="text-center text-muted" style={{ maxWidth: "300px", fontSize: "14px", marginTop: "8px" }}> Enter the verification code sent to your email address below.  </p>
              </div>

              <div style={{ margin: "0 auto", maxWidth: "350px" }}>
              <Form onSubmit={(e) => { e.preventDefault();  pinHandler() ; }}>
                  <Form.Group className="mb-3 d-flex justify-content-between">
                    {Array.from({ length: 6 }, (_, i) => (
                        <Form.Control
                          key={i}
                          ref={(el) => (inputsRef.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          pattern="\d*"
                          aria-label={`pin${i + 1}`}
                          className="text-center mx-1"
                          style={{
                            height: "50px",
                            width: "50px",
                            fontSize: "24px",
                            border: "1px solid #ddd",
                            borderRadius: "5px"
                          }}
                          onInput={(e) => {
                            const input = e.target;
                            const value = input.value;
                            if (!/^\d$/.test(value)) input.value = ""; // Prevent non-numeric input
                            const nextInput = input.nextElementSibling;
                            if (value && nextInput) nextInput.focus(); // Auto-focus next field
                          }}
                          onKeyDown={(e) => {
                            const input = e.target;
                            if (e.key === "Backspace" && !input.value) {
                              const prevInput = input.previousElementSibling;
                              if (prevInput) prevInput.focus();
                            }
                          }}
                        />
                    ))}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 text-white"
                    
                    style={{ padding: "10px 0", fontWeight: "bold" }}
                  >
                    SUBMIT
                  </Button>
                </Form>
              </div>
            </Modal.Body>

            <Modal.Footer className="justify-content-center m-2">
                  
            </Modal.Footer>
          </Modal>





                  
          <Modal show={showChangePassword} onHide={togglePinModal} centered>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body className="p-2" style={{ padding: "0 24px" }}>
                {/* Container for Image and Text */}
                <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                  <img
                    src="https://res.cloudinary.com/dvhfgstud/image/upload/v1732195465/locked_hcbeui.png"
                    alt="Company Logo"
                    style={{ width: "90px", height: "90px" }}
                  />
                  <h6 className="mt-3">Forgot Password?</h6>
                  <p className="text-center text-muted" style={{ maxWidth: "300px", fontSize: "16px", marginTop: "8px" }}>
                    To complete the process, please create a new password for your account.
                  </p>
                </div>

                {/* Instructions on the Left */}
                <div style={{ textAlign: "left", marginBottom: "20px",marginLeft:"65px", fontSize: "8px", color: "#87A2FF" }}>
                  <li>Make sure it's secure and memorable.</li>
                  <li>10 characters minimum</li>
                </div>

                {/* Form Container */}
                <div style={{ margin: "0 auto", maxWidth: "350px" }}>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      changePasswordHandler()
                    }}
                  >
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <Form.Control
                          type="password"
                          placeholder="New Password"
                          aria-label="New Password"
                          className="rounded p-3 mt-2"
                          onChange={(e) => setNewPassword(e.target.value)}
                          style={{ letterSpacing: ".9px" }}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <Form.Control
                          type="password"
                          placeholder="Retype New Password"
                          aria-label="Retype New Password"
                          className="rounded p-3 mt-2"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={{ letterSpacing: ".9px" }}
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* Update Password Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 text-white"
                      style={{ padding: "10px 0", fontWeight: "bold" }}
                    >
                      Update Password
                    </Button>
                  </Form>
                </div>
              </Modal.Body>

              <Modal.Footer className="justify-content-center m-2">
                Not an admin? <a href="http://localhost:5173/" style={{ textDecoration: "none" }}>Login as user</a>
              </Modal.Footer>
          </Modal>



          {/* <Modal show={recaptchaHandler} className="d-flex align-items-center">
                  <Modal.Header >
                      <Modal.Title className="d-flex align-items-center ">GOOGLE RECAPTCHA</Modal.Title>
                  </Modal.Header>
              <Modal.Body>  
              <form onSubmit={handleSubmit}>
               
                    <ReCAPTCHA
                      sitekey={captchaKey}
                      onChange={handleRecaptchaChange}
                    />
                    <br />
                    <button type="submit">Submit</button>
                  </form>

              </Modal.Body>

          </Modal> */}




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
              }}
            >
        
              {modalImage && <img src={modalImage} alt="Modal Image" style={{ width: '50px', height: '50px', marginBottom: '20px', borderRadius: '8px' }} />}
              
              <p style={{fontSize:".9rem"}}>{modalMessage}</p>
              <Button
                variant= {buttonColor}
                onClick={() => setModalIsOpen(false)}
                style={{
                  marginTop: '15px',
                  width: '100%',
                  borderRadius: '5px',
                }}
              >
              continue
              </Button>
            </Modal.Body>
          </Modal>




        {/** SECOND COLUMN / RIGHT SIDE */}
        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 4, offset: 2 }}
        >
          <div style={{ marginLeft: "4.5rem", textAlign: "left" }}>
            <h4
              style={{
                color: "white",
                fontFamily: "Helvetica",
                fontStyle: "italic",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Educate. Innovate. Lead
            </h4>
            <h3
              style={{
                color: "white",
                fontFamily: "Helvetica",
                fontWeight: 700,
                fontSize: "2rem",
              }}
            >
              Welcome Back!
            </h3>

            {/** SIGN UP PORTION */}
            <Button
              variant="primary"
              type="button"
              className="d-flex align-items-center justify-content-center"
              style={{
                fontFamily: "Helvetica",
                padding: "0.75rem 1.5rem",
                fontSize: "1.25rem",
                height: "4rem",
                width: "25rem",
                marginTop: "1rem",
                marginBottom: "2rem",
                borderRadius: "1.5rem",
              }}
              onClick={() => navigate("/user/signup_google")}
            >
              <img
                src="./images/BSU_LOGO.png"
                alt="Login Icon"
                style={{ width: "38px", height: "38px", marginRight: "10px" }}
              />
              No account yet? Signup
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserLandingPage;
