import React, { useState,useEffect,useRef  } from "react";
import { Container, Row, Col, Form, Button, InputGroup ,Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../styles/LandingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 



function AdminLandingPage() {
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
  const [forgotEmail,setForgotEmail] = useState("")



  const [modal, setModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const handleShow = () => setShow(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalImage,setModalImage] = useState('')
  const navigate = useNavigate();
  const [verifyPinModal,setVerifyPinModal] = useState(false)
  const [newPasswordModal,setNewPasswordModal] = useState(false)
  const [pin, setPin] = useState(Array(6).fill(""));
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [newPassword,setNewPassword] = useState('')
  const [buttonColor,setButtonColor] = useState('')
  const [confirmnewPassword,setConfirmNewPassword] = useState('')
  const [showButton, setShowButton] = useState(false);
  const inputsRef = useRef([]);
  


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



  const openModalWithImage = (imageUrl, message,buttonColor) => {
      setModalImage(imageUrl);   
      setModalMessage(message);  
      setButtonColor(buttonColor)
      setModalIsOpen(true);      
    };


    const handleClose = () => {
      setShowPinModal(false);
    };



    const validateNullInputFields = (email, password) => {
      if (email === "" && password === "") {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118471/warning_2_sjx4ui.png');
        setModalMessage('Fields cannot be empty. Please provide the required information.');
        setModalIsOpen(true);
        return false; // Validation failed
      }
      if (email === "") {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118471/warning_2_sjx4ui.png');
        setModalMessage('Email is required!');
        setModalIsOpen(true);
        return false; // Validation failed
      }
      if (password === "") {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118471/warning_2_sjx4ui.png');
        setModalMessage('Password is required!');
        setModalIsOpen(true);
        return false; // Validation failed
      }
      
      const allowedDomains = ['@buksu.edu.ph', '@student.buksu.edu.ph'];
      const isValid = allowedDomains.some((domain) => email.endsWith(domain));
      if (!isValid) {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118471/warning_2_sjx4ui.png');
        setModalMessage('Non-Institutional Accounts are not allowed!');
        setModalIsOpen(true);
        return false; // Validation failed
      }
      
      return true;
    };



    const validateForgotEmail = (forgotEmail) =>
              {
                if (forgotEmail === "") {
                  setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118471/warning_2_sjx4ui.png');
                  setModalMessage('Email is required!');
                  setModalIsOpen(true);
                  return false; // Validation failed
                }
                 const allowedDomains = ['@buksu.edu.ph', '@student.buksu.edu.ph'];
                 const isValid = allowedDomains.some((domain) => forgotEmail.endsWith(domain));
                 if (!isValid) {
                   setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732118471/warning_2_sjx4ui.png');
                   setModalMessage('Non-Institutional Accounts are not allowed!');
                   setModalIsOpen(true);
                   return false; // Validation failed
                 }
                return true; 
        }






        const handleSubmit = async (e) => //para sa login
           { e.preventDefault();

            const isValid = validateNullInputFields(email, password);
            if (!isValid) { return; }
            const data = { email, password };
    
            try {
              const response = await fetch("http://localhost:8000/admin/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (!response.ok) {
                setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732120207/error_rbqoyb.png')
                setModalMessage('401 Unauthorized: You are not permitted to access this resource. Contact support for help.');
                setModalIsOpen(true);
                return;
              } 
                const responseData = await response.json();       
                localStorage.setItem("admin_info", JSON.stringify(responseData.admin));
                const adminInfo = JSON.parse(localStorage.getItem("admin_info")); 
                const id = adminInfo.admin_id; 
                const role = adminInfo.role
                console.log(role)
                console.log(id)
                if(role === "Head")
                {
                  console.log("admin name",adminInfo.name)
                  console.log('admin role',role)
                  navigate(`/admin/head_homepage?`);
                }
                if(role === "Supervisor")
                {
                  navigate(`/admin/homepage?`);
                }
            } catch (err) {
              setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732121061/no-internet_amyf7a.png')
              setModalMessage('An unexpected error occurred. Please try again later.');
              setModalIsOpen(true);
            }
          };




          function pinNullHandler (completePin)
          {
                if (completePin.length !== 6) {
                  setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                  setModalMessage('Pin must be 6 digits long!');
                  setModalIsOpen(true);
                  return false;
                }  if (!/^\d{6}$/.test(completePin)) {
                  setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                  setModalMessage('Input must be a number');
                  setModalIsOpen(true);
                  return false;
                } 
                if (completePin === "") {
                    setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                    setModalMessage('Input fields should not be null');
                    setModalIsOpen(true);
                    return false;
                    }
                    return true;
          }


            const resendCode = async (e) =>
              {e.preventDefault()
                alert('resend button clicked!')
            }



          const verifyPinHandler = async (e) => 
              {
               
                const completePin = inputsRef.current.map((input) => input.value).join("");
          
                const IsValid = pinNullHandler(completePin)
                
                if(!IsValid)
                {
                  return;
                }

              const data = {forgotEmail,completePin};
                try{
                    console.log('Forgot email that will be sent to backend ',forgotEmail)
                    const response = await fetch('http://localhost:8000/admin/verify_pin',
                      {
                        method:'POST',
                        body:JSON.stringify(data),
                        headers: { "Content-Type": "application/json", },
                        credentials: 'include',
                      }
                    )

                    if(!response.ok)
                      {
                        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                        setModalMessage('Pin incorrect');
                        setModalIsOpen(true);
                        return;
                      }
                     
                      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732265851/verified_qylqds.png')
                      setModalMessage('Congratulations! You are Verified');
                      setModalIsOpen(true);
                      setVerifyPinModal(false);
                      setNewPasswordModal(true);
                      return;

                }catch(error)
                  {
                    setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
                    setModalMessage('Cannot run try statement in frontend');
                    setModalIsOpen(true);
                  }
          }


          const forgotPasswordEmailHandler = async (e) => //para ni sa forgotEmail - mag send ug verification code
            {    
              const isValid =  validateForgotEmail(forgotEmail);

              if (!isValid) { return; }
              
                const data = {forgotEmail};

                try
                {
                  const response  = await fetch('http://localhost:8000/admin/forgot_password_verify',{
                        method:'POST',
                        body: JSON.stringify(data),
                        headers: {
                          "Content-Type": "application/json",
                        }
                      })

                      if(!response.ok)
                           {
                            setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732120207/error_rbqoyb.png')
                            setModalMessage('401 Unauthorized: Your email '+forgotEmail+' is not registered to our system!');
                            setModalIsOpen(true);
                            return;
                        }
                        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732202334/tick_whwxlk.png')
                        setModalMessage('202 Successfull: We already sent the verification code to your email '+ forgotEmail);
                        setModalIsOpen(true);
                        setShowPinModal(false);
                          setVerifyPinModal(true);
                        setIsActive(true)
                        
                        return;
                }catch(error) 
                      {
                        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
                        setModalMessage('An unexpected error occurred. Please try again later.');
                        setModalIsOpen(true);
                    }
          }

     
        



          function passwordMatchChecker (newPassword,confirmnewPassword)
                 {
                  if(newPassword === "" || confirmnewPassword === "")
                    {
                      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png')
                      setModalMessage('Please fill in all the fields to continue.');
                      setModalIsOpen(true);
                      return false;
                    }

                    if(newPassword !== confirmnewPassword)
                      {
                        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                        setModalMessage('To set a new password, the New Password and Confirm Password fields must match.');
                        setButtonColor('warning')
                        setModalIsOpen(true);
                        return false;
                    } 
                    
                    if (newPassword.length <= 10) {
                      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png');
                      setModalMessage('Password should be more than 10 characters, including a combination of numbers and letters.');
                      setModalIsOpen(true);
                      setButtonColor('warning')
                      return false;
                  }
                  
                    return true;
              }

          
          const changePassword = async () =>
           {  
              const isValid = passwordMatchChecker(newPassword,confirmnewPassword);
              if(!isValid) {return}

            let  forgotEmail = "2201102996@student.buksu.edu.ph" //ilisan rani if ma okay na ang pin validation
              const data = {forgotEmail,newPassword};

              try
               {
                  const response  = await fetch('http://localhost:8000/admin/change_password',
                    {
                        method: "PATCH",
                        body:JSON.stringify(data),
                        headers: { "Content-Type": "application/json", },
                    }
                  )

                  if(!response.ok)
                        {
                          setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                          setModalMessage('Something went wrong while processing change password');
                          setButtonColor('danger')
                          setModalIsOpen(true);
                          return false;
                    }
                          setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png')
                          setModalMessage('Password updated successfully');
                          setButtonColor('success')
                          setModalIsOpen(true);
                          setNewPasswordModal(false);
              }catch(error)
                  {
                        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
                        setModalMessage('An unexpected error occurred. Please try again later.');
                        setModalIsOpen(true);
                    return;
                  }
           }



               
          const [timeLeft, setTimeLeft] = useState(2 * 60); 
          const [isActive, setIsActive] = useState(false); 

          useEffect(() => {
            let timer;
            if (isActive && timeLeft > 0) {  timer = setInterval(() =>
              {
                setTimeLeft((prevTime) => prevTime - 1);
              }, 1000);
            } else if (timeLeft === 0) {
              clearInterval(timer);
              pinTimeoutTimer();
              setShowButton(true);
            }
        
            return () => clearInterval(timer); 
          }, [isActive, timeLeft]);
        
          const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
          };
        
          const startTimer = () => {
            setIsActive(true); 
          };




          const resendPin = async () => //para ni sa resend pin
            {   
                setShowButton(false);
                setTimeLeft(2 * 60)
                const data  = {forgotEmail};
                console.log('the forgotEmail is',forgotEmail)
                try{
                      const response = await fetch('http://localhost:8000/admin/resend_pin',
                          {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: { "Content-Type": "application/json" },
                          })
                        if(!response.ok)
                          {
                            setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                            setModalMessage('Something went wrong while resending the pin');
                            setButtonColor('danger')
                            setModalIsOpen(true);
                            return;
                          }
                        
                          setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png')
                          setModalMessage('New verification pin has been sent');
                          setButtonColor('success')
                          setModalIsOpen(true);
                          return;
                }catch(error)
                  {
                    setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
                    setModalMessage('An unexpected error occurred. Please try again later.');
                    setModalIsOpen(true);
                    return;
                }
          }


          const pinTimeoutTimer = async () =>
           {
                const data = {forgotEmail};

              try
              {
                    const response  = await fetch('http://localhost:8000/admin/pin_timeout',
                      { method:'POST',body:JSON.stringify(data), headers: { "Content-Type": "application/json", },})

                      if(!response.ok)
                          {
                            setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732209488/remove_w2nkoi.png')
                            setModalMessage('Something went wrong while removing the pin');
                            setButtonColor('danger')
                            setModalIsOpen(true);
                            return;
                      }
                      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png')
                      setModalMessage('The verification code has expired. Please click the Resend pin to send a new verification code to '+forgotEmail);
                      setButtonColor('warning')
                      setModalIsOpen(true);
                      return;
              }catch(error)
                {
                  setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732190987/no-wifi_sxabwm.png')
                  setModalMessage('An unexpected error occurred while running the try and catch in frontend -pin timeout');
                  setModalIsOpen(true);
                  return;
              }
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
          <div>
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
              </h4>
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
                  autoComplete = "current-email"
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
            </Form>

            <div>
              {/** LOG IN AS ADMIN */}
              <h6
                className="text-center mt-5"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              >
                <a
                  href="/"
                  style={{
                    textDecoration: "none",
                    display: "block",
                    color: "black",
                    marginBlock: "5px",
                  }}
                >
                  LOGIN AS USER
                </a>
              </h6>

              {/** FORGOT PASSWORD */}
              <h6
                className="text-center"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              >
               <button
                      className="btn  btn-outline"
                      onClick={() => setShowPinModal(true)}
                      > Forgot Password?</button> 
                 
               
              </h6>
            </div>
          </div>
        </Col>

        
              <Modal show={showPinModal} onHide={handleClose} centered>
                <Modal.Header closeButton></Modal.Header>
                  <Modal.Body className="p-2" style={{ padding: "0 24px" }}>
                    {/* Container for Image and Text */}
                    <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                      <img
                        src="https://res.cloudinary.com/dvhfgstud/image/upload/v1732109312/forgot-password_trvs5q.png"
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
                        forgotPasswordEmailHandler()
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
                    Not an admin? <a href="http://localhost:5173/" style={{textDecoration:"none"}}>login as user</a> 
                  </Modal.Footer>
      </Modal>



     
          <Modal show={verifyPinModal} onHide={handleClose} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="p-2" style={{ padding: "0 24px" }}>
            
              <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                <img src="https://res.cloudinary.com/dvhfgstud/image/upload/v1732194851/authentication_jdckfv.png"  alt="Company Logo" draggable="false"    style={{ width: "90px", height: "90px" }}/>
                <h6 className="mt-3">Verify your account</h6>
                <p className="text-center text-muted" style={{ maxWidth: "300px", fontSize: "14px", marginTop: "8px" }}> Enter the verification code sent to your email address below.  </p>
              </div>

              <div style={{ margin: "0 auto", maxWidth: "350px" }}>
              <Form onSubmit={(e) => { e.preventDefault(); verifyPinHandler(); }}>
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
                    <h6>Code Expires in {formatTime(timeLeft)} </h6>  
                    {showButton && 
                          (
                               <button className="btn btn-outline-danger" onClick={resendPin}> Resend Pin </button>
                           )}

            </Modal.Footer>
          </Modal>




          <Modal show={newPasswordModal} onHide={handleClose} centered>
             
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
                      changePassword()
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
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            variant={buttonColor}
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





        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 4, offset: 2 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="../images/BukSULOGO.png"
              alt="SVG Icon"
              style={{
                width: "50%",
                height: "auto",
                filter: "invert(100%) grayscale(100%)",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLandingPage;
