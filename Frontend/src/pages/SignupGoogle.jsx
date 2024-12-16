import React from "react";
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Fixed missing import
import {Navbar,Container, Row,Col,Form,InputGroup,Card,Button,DropdownButton,Dropdown,Modal} from "react-bootstrap";
import NavbarComponent from "../components/NavBarComponents";
import { ToastContainer, toast } from 'react-toastify';
import "../styles/SignupGoogle.css"; // Assuming you are using react-toastify for notifications
import { library } from "@fortawesome/fontawesome-svg-core";
import Swal from 'sweetalert2';


function SignupGoogle() {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirm_password, setConfirmPassword] = useState("");

  let [office_code, setOfficeCode] = useState("");
  let [college_name, setCollegeName] = useState("");



  const [inputtedCode, setInputtedCode] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false); 
  const inputsRef = useRef([]);
  const toggleCodeModal = () => {setShowCodeModal(showCodeModal);};
  const [time,setTime] = useState(5);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalImage,setModalImage] = useState('')
  const [buttonColor,setButtonColor] = useState('')
  const [errorModal,setShowErrorModal] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')
  const [errorColor,setErrorColor] = useState('')
  const [errorIcon,setErrorIcon] = useState('')
  const [errorDiv,setErrorDiv] = useState('')
  const warning = '#FCC737'
  const danger = '#C63C51'


  
  const handleInputPin = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "")
       {
          const newPin = [...pin];
          newPin[index] = value; 
          setInputtedCode(newPin);
      }
    const isEmpty = newPin.some(pinValue => pinValue === ""); 
      setSubmitDisabled(isEmpty)
   };





  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
    
    alert('Login failed. Please try again.');
  };

   const handleSelectChange = (event) => {
    let selectedValue = event.target.value;
    let [code, college] = selectedValue.split(' | ');
    let capsCollege = college.toUpperCase();
     setOfficeCode(code);
     setCollegeName(capsCollege);
  };

//================================================================================


useEffect(() => {
  if (time < 0) return;
  const interval = setInterval(() => {
    setTime(prevTime => {
      if (prevTime < 0) {
        clearInterval(interval);
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);
  return () => clearInterval(interval);
}, [time]);


function validateEmail(email) {
  // Define the allowed email domains
  if(email !== "")
  {
  const allowedDomains = ['@buksu.edu.ph', '@student.buksu.edu.ph'];
  const isValid = allowedDomains.some((domain) => email.endsWith(domain));
  return isValid;}
}


  function alphaNumericChecker (password) {
     if(password.length <= 8)
     {
      alert('password should not less than 8 in length')
      return false;
     }
     return true;
  }





    async function validatePassword(password,confirm_password) {

      if(password === "" && confirm_password === "")
      {
        setShowErrorModal(true)
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734241668/warning-sign_ajxpqp.png')
        setErrorColor('white')
        setErrorDiv(warning)
        setErrorMessage('Input cannot be empty! Please complete all required fields before proceeding.')
        return false;
      }

      if(password !== confirm_password)
      {
        setShowErrorModal(true)
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734241668/warning-sign_ajxpqp.png')
        setErrorColor('white')
        setErrorDiv(warning)
        setErrorMessage('Passwords do not match. Please ensure both password fields are identical.')
        return false;    
      }
     
      return true;
}




      async function emailValidator(email)
      {
        email = email.trim();

        if (email === "") {
        
          setShowErrorModal(true)
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734241668/warning-sign_ajxpqp.png')
          setErrorColor('white')
          setErrorDiv(warning)
          setErrorMessage('Email is required')
            return false;
        }
    
        const allowedDomains = ['@buksu.edu.ph', '@student.buksu.edu.ph'];
        const isValid = allowedDomains.some(domain => email.endsWith(domain));
        
        if (!isValid) {
        
          setShowErrorModal(true)
          setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734241668/warning-sign_ajxpqp.png')
          setErrorColor('white')
          setErrorDiv(warning)
          setErrorMessage('Non-Institutional Accounts are not allowed!')
            return false;
        }
       return true;
      }


      async function NullChecker(office_code, college_name) {
        if (college_name === "" && office_code === "") {

          return { office_code: "Not Set", college_name: "Not Set" };
        }
        return { office_code, college_name };  // Return the values as an object
      }
    




const sendEmailVerification = async (e) => {
  e.preventDefault();

  const isValid = await emailValidator(email) 
  if(!isValid)
    {return;}

  const validPassword = await validatePassword(password,confirm_password)
      if(!validPassword)
      {
        return;
      }

      const checker = await NullChecker(office_code, college_name);
      office_code = checker.office_code;
      college_name = checker.college_name;
     
      const data = { name, email };
          
  try {
  
    const response = await fetch('http://localhost:8000/user/signup/code_sender', {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    if (!response.ok) {
            setShowErrorModal(true)
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
            setErrorMessage('Unable to continue because you are already registered! We will redirect you to the login page');
            setErrorColor('white')
            setErrorDiv(warning)
            setTime(5)
          setTimeout(() => {
            window.location = "http://localhost:5173/"; 
          }, 5000); 
        
     return;
    } 
      alert('response is valid!')
      setShowCodeModal(true)
      return;
  } catch (error) {
    console.log('cannot run try statement');
   return;
  }
};



const verifyPinAndRegister = async () => {

  const data = { inputtedCode, name, email, password, office_code, college_name };
  console.log('the inputted user in frontend is ',inputtedCode)


  try {
    const response = await fetch('http://localhost:8000/user/signup/verify_pin', {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    if (!response.ok) {
     alert('response from backend is unsuccessful! maybe due do already registered')
    } else {
      console.log('This is the inputted code: '+inputtedCode);
      alert('response from backend is successful!')
      setShowCodeModal(false)
      navigate('/');
    }
  } catch (error) {
    console.error("Error:", error);
    alert('something went wrong! -CATCH VERIFY PIN')
  }
};





const signupAsGoogleHandler = async () => {
  try {
    const response = await fetch('http://localhost:8000/user/signup_as_google', {
      method: 'POST',
    });
    const data = await response.json();
    console.log('Response from backend:', data); 
      
    if (data.url) {
      window.location.href = data.url;
    
    } else {
      console.error('Authorization URL not received from the backend');
      return;
    }
  } catch (error) {
    console.error('Error during Google signup:', error);
  }
};
      


  return (
          <>
     
      <NavbarComponent/>

      
      <Container>
        <Row>
      
          <Col>
            <img
              src="../images/PICT1.png"
              alt="pict1"
              className="img-fluid"
              style={{
                maxWidth: "25rem",
                height: "auto",
                marginTop: "5rem",
                marginLeft: "2rem  ",
              }}
            />
          </Col>

          {/** SECONDD COLUMN / RIGHT SIDE */}
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1", marginTop: "5rem" }}>
              <Card.Body>
                <Form onSubmit={sendEmailVerification} style={{ padding: "1rem" }}>
                  <div style={{ display: "flex" }}>
                    <InputGroup className="mb-3">
                      {/* NAME INPUT FIELD */}
                      <Form.Control
                        id="Name"
                        type="text"
                        placeholder="Name"
                        aria-label="Name"
                        required
                        aria-describedby="basic-addon1"
                        onChange={(e) => setName(e.target.value)}
                       
                        style={{
                          backgroundColor: "#0760A1",
                          color: "white",
                          fontFamily: "Helvetica",
                          border: "none",
                          padding: "1rem",
                          fontSize: "1rem",
                          height: "2.8rem",
                          width: "60%", // Increase the width of the input field to make it larger than the select
                        }}
                        className="custom-input"
                     
                      />
                    </InputGroup>

                    <Form.Select
                      id="office_list"
                      aria-label="Office"
                      value={`${office_code},${college_name}`}
                      onChange={handleSelectChange}
                      required
                      style={{
                        marginLeft: ".5rem",
                        border: "1px solid #0760A1", // Adds the border in #0760A1
                        color: "#0760A1", // Sets the text color to #0760A1
                        height: "2.8rem", // Matches the height of the input field
                        width: "40%", // Adjust the width of the select to be smaller than the input
                      }}
                    >
                      <option value="" disabled selected> Please select an office </option>
                      <option value="" disabled>    A    </option>
                      <option value="A101-4F2D1E8C9B |  Accounting Unit (Assessment) - 101">
                        Accounting Unit (Account) 
                      </option>
                      <option value="A102-7D4C1A0E3B |  Accounting Unit (Assessment) - 102">
                        Accounting Unit (Assessment) 
                      </option>
                      <option value="A314-5E2F1D0B4A | Admission and Testing Unit (ATU) / Student Welfare and
                        Engagement Unit (SWEU)">
                        Admission and Testing Unit (ATU) / Student Welfare and
                        Engagement Unit (SWEU) 
                      </option>
                      <option value="" disabled>
                        B
                      </option>
                      <option value="B168-9F1C2A4D7D |   Bids & Awards Committee (BAC) / Procurement Unit (PU)">
                        Bids & Awards Committee (BAC) / Procurement Unit (PU) 
                      </option>
                      <option value="B193-2B3D5F6E8E | Board Room">Board Room </option>
                      <option value="B194-A3D5E9F8F7 | Board Secretary">
                        Board Secretary 
                      </option>
                      <option value="B312-4E7D1A2B3D | Botanical Gardens and Herbarium (BGH)">
                        Botanical Gardens and Herbarium (BGH) 
                      </option>
                      <option value="B114-2D4F1A8C6A | Budget Unit">Budget Unit </option>
                      <option value="B342-9F2E1B6D3B | Bukidnon Study Center (BSC) / University Museum">
                        Bukidnon Study Center (BSC) / University Museum 
                      </option>
                      <option value="B307-1A5F3E8D6C | BukSU Cooperative ">
                        BukSU Cooperative 
                      </option>
                      <option value="B308-F9E1B2A7D8 | BukSU Faculty Association (BSUFA)">
                        BukSU Faculty Association (BSUFA) 
                      </option>
                      <option value="B314-A6D4C1F7E9 |  Business Affairs Unit (BAU)">
                        Business Affairs Unit (BAU) 
                      </option>
                      <option value="" disabled>
                        C
                      </option>
                      <option value="C109-8E2D3B7F5C | COLLEGE OF ARTS AND SCIENCES">
                        CAS Guidance
                      </option>
                      <option value="C103-9F2E1A6D3D |  Cashiering Unit (Window 1 & 2)">
                        Cashiering Unit (Window 1 & 2) 
                      </option>
                      <option value="C139-3F1D8B2E9D |  Center for Innovative Teaching and Learning (CITL)">
                        Center for Innovative Teaching and Learning (CITL) 
                      </option>
                      <option value="C137-7F2D5E8C1A |  Chief Administrative Office (CAO) Admin">
                        Chief Administrative Office (CAO) Admin 
                      </option>
                      <option value="C129-9E3D1A6B8C | Chief Administrative Office (CAO) Finance">
                        Chief Administrative Office (CAO) Finance
                      </option>
                      <option value="C185-1D4F9E2B4A |  Chief Administrative Office (CAO) Finance Officer">
                        Chief Administrative Office (CAO) Finance Officer 
                      </option>
                      <option value="C182-5F1D9E3B6A | COLLEGE OF ARTS AND SCIENCES">
                        College of Arts and Sciences (CAS) Dean’s Office 
                      </option>
                      <option value="C145-7E2D9F1B2B | COLLEGE OF BUSINESS ">
                        College of Business (COB) Dean’s Office 
                      </option>
                      <option value="C157-A8F6D3B2C5 | COLLEGE OF EDUCATION">
                        College of Education (COE) Dean’s Office 
                      </option>
                      <option value="C145-1D9F8A4B7D | COLLEGE OF LAW">
                        College of Law (COL) Dean’s Office & Faculty 
                      </option>
                      <option value="C172-6F3D8E1A4F | COLLEGE OF MEDICINE">
                        College of Medicine (COM) Dean’s Office thru CON 
                      </option>
                      <option value="C172-9E2D1F8A3D | COLLEGE OF NURSING">
                        College of Nursing (CON) Dean’s Office & Faculty 
                      </option>
                      <option value="C184-5A7D9F1B2D | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE">
                        College of Public Administration and Governance (CPAG)
                        Dean’s Office 
                      </option>
                      <option value="C183-9F1D4B7A8C | COLLEGE OF TECHNOLOGY">
                        College of Technology (COT) Dean’s Office 
                      </option>
                      <option value="C106-7A9D1F2B4A  | Commission on Audit (COA) ">
                        Commission on Audit (COA) 
                      </option>
                      <option value="" disabled>
                        D
                      </option>
                      <option value="D415-8E1D4F7C5D |  Dental Clinic">
                        Dental Clinic 
                      </option>
                      <option value="D411-6F2D5A1C8E |  Disaster Risk Reduction & Management Unit (DRRM)">
                        Disaster Risk Reduction & Management Unit (DRRM) 
                      </option>
                      <option value="D205-7A9E4F1B6D | Dormitory - Hostel">
                        Dormitory - Hostel 
                      </option>
                      <option value="D171-1A9E3D5C7A | Dormitory - Kalala">
                        Dormitory - Kalala 
                      </option>
                      <option value="D180-5F3D9B4C2D |  Dormitory - Mahogany">
                        Dormitory - Mahogany
                      </option>
                      <option value="D197-7E2D5F1C3D | Dormitory - Rubia">
                        Dormitory - Rubia 
                      </option>
                      <option value="D195-4A8D2F1B6D | Dormitory - Rubia Cafeteria">
                        Dormitory - Rubia Cafeteria 
                      </option>
                      <option value="D165-2F7E9A3C1D | DXBU">DXBU </option>
                      <option value="" disabled>
                        E
                      </option>
                      <option value="E122-3F1D5B9E7A |   Economic Enterprise Unit (EEU)">
                        Economic Enterprise Unit (EEU) 
                      </option>
                      <option value="E141-1D5A7B9C2A |  Elementary Laboratory School">
                        Elementary Laboratory School 
                      </option>
                      <option value="E144-3D7F8A5B1D |  Environmental Health & Safety Office (EHSO)">
                        Environmental Health & Safety Office (EHSO) 
                      </option>
                      <option value="E176-9F1D3A5B2D |  Extension Director">
                        Extension Director 
                      </option>
                      <option value="" disabled>
                        F
                      </option>
                      <option value="F200-2D7E1F9B5A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS DevCom & ComDev Department 
                      </option>
                      <option value="F147-8A9D1F3C4B | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Economics Department 
                      </option>
                      <option value="F128-7D4E1A5B9C | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS General Education Department 
                      </option>
                      <option value="F148-9E1D3F5B7D | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS General Science Department 
                      </option>
                      <option value="F124-1D9E3B7C8A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Language and Letters Department (LLD),
                        English & Filipino, Graduate Studies 
                      </option>
                      <option value="F148-5A3F9E2D1A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Mathematics Department
                      </option>
                      <option value="F128-9D5A1E3B6D | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Natural Science Department 
                      </option>
                      <option value="F148-1B7E3D5C9D | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Philosophy Department 
                      </option>
                      <option value="F103-9E1D7B5C8A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Social Science Department 
                      </option>
                      <option value="F189-2D7E1A6B5A | COLLEGE OF BUSINESS">
                        Faculty - COB Accountancy Department
                      </option>
                      <option value="F182-9D5A1E3B6A | COLLEGE OF BUSINESS">
                        Faculty - COB Business Administration Department 
                      </option>
                      <option value="F103-7A9D1F6C3D | COLLEGE OF BUSINESS">
                        Faculty - COB Hospitality Management Department 
                      </option>
                      <option value="F172-4D3E1F7B9D | COLLEGE OF EDUCATION">
                        Faculty - COE Elementary Laboratory School 
                      </option>
                      <option value="F187-1F2D5A9C4D | COLLEGE OF EDUCATION">
                        Faculty - COE P. E. Chairperson 
                      </option>
                      <option value="F137-7D3F8A1C2B | COLLEGE OF EDUCATION">
                        Faculty - COE P. E. Department 
                      </option>
                      <option value="F178-5A9D1E2F6D | COLLEGE OF EDUCATION">
                        Faculty - COE Secondary Laboratory School 
                      </option>
                      <option value="F179-4D3E1B7A8C | COLLEGE OF TECHNOLOGY">
                        Faculty - COT Automotive Department 
                      </option>
                      <option value="F184-6A7F3D9B1A | COLLEGE OF TECHNOLOGY">
                        Faculty - COT Food Technology 
                      </option>
                      <option value="F203-8B1D9F7E5A | COLLEGE OF TECHNOLOGY">
                        Faculty - COT IT, Electronics Department 
                      </option>
                      <option value="F203-1D5E8A7F9A | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE">
                        Faculty - CPAG Bachelor of Public Administration (BPA)
                        Department 
                      </option>
                      <option value="F203-7D9A1E5B6A | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE">
                        Faculty - CPAG Chairperson of DPA and MPA
                      </option>
                      <option value="" disabled>
                        G
                      </option>
                      <option value="G107-2D9A5B7F1C | Gender & Development (GAD) Unit">
                        Gender & Development (GAD) Unit 
                      </option>
                      <option value="G147-1F9D2A3B8C | General Services Unit (GSU)">
                        General Services Unit (GSU) 
                      </option>
                      <option value="G097-7F2D1A9C5A | Graduate Studies Office Ms. Margarita">
                        Graduate Studies Office Ms. Margarita 
                      </option>
                      <option value="G104-8F2D1E9A6D | Guard House 1 (Near BNHS)">
                        Guard House 1 (Near BNHS) 
                      </option>
                      <option value="G106-9E5D3A1F4D |  Guard House 2 (Main Gate)">
                        Guard House 2 (Main Gate) 
                      </option>
                      <option value="G106-2D9E4B1A5C |  Guard House 3 (Near Zeta)">
                        Guard House 3 (Near Zeta) 
                      </option>
                      <option value="G116-5F1D7A3E9B |  Guidance Office ">
                        Guidance Office 
                      </option>
                      <option value="" disabled>
                        H
                      </option>
                      <option value="H141-2D3E5F9B6C |  HRMU Learning and Development ">
                        HRMU Learning and Development
                      </option>
                      <option value="H739-4D8F2A7B1E | Hotel Laboratory, Casisang">
                        Hotel Laboratory, Casisang
                      </option>
                      <option value="H306-9D1A5F7C3D | HRMU Performance Management">
                        HRMU Performance Management 
                      </option>
                      <option value="H191-7E2D5A8C3A | HRMU Staff">HRMU Staff - 191</option>
                      <option value="" disabled>
                        I
                      </option>
                      <option value="I179-4C7D9E1B5F | ICTU Audio Visual Center (AVC)">
                        ICTU Audio Visual Center (AVC)
                      </option>
                      <option value="I121-3E2F5A9B6C |  ICTU Computer Laboratory-Telephone Concerns">
                        ICTU Computer Laboratory-Telephone Concerns
                      </option>
                      <option value="I131-7B3D9F1A5D | ICTU Data Center ">
                        ICTU Data Center 
                      </option>
                      <option value="I198-5A7F2D9B6A |  ICTU Mini-Theater">
                        ICTU Mini-Theater 
                      </option>
                      <option value="I128-3D2E1F9C8B | ICTU Officer">
                        ICTU Officer
                      </option>
                      <option value="I311-9F7A4C2D1A |  Information Unit (IU)">
                        Information Unit (IU) 
                      </option>
                      <option value="I110-2F9A6D3B7A |  Intellectual Property & Technology Transfer Unit (IPTTU)">
                        Intellectual Property & Technology Transfer Unit (IPTTU)
                       
                      </option>
                      <option value="I300-5D1F7A9C3A |   Internal Audit Unit (IAU)">
                        Internal Audit Unit (IAU) 
                      </option>
                      <option value="I313-4F8D1A7B9A |  International Affairs & Linkages Unit (IALU) & Alumni
                        Relations Unit (ARU)">
                        International Affairs & Linkages Unit (IALU) & Alumni
                        Relations Unit (ARU) 
                      </option>
                      <option value="" disabled>
                        L
                      </option>
                      <option value="L141-1F9D3A7B8A | Legal Unit">Legal Unit - 141</option>
                      <option value="L302-8A9D1F7E3D | Library - 1st Floor (Learning Commons)">
                        Library - 1st Floor (Learning Commons) 
                      </option>
                      <option value="L303-2E7D5F1A8D |  Library - 2nd Floor (Office of the University Librarian)">
                        Library - 2nd Floor (Office of the University Librarian)
                      
                      </option>
                      <option value="L303-7F2D8A9C5D |  Library - 3rd Floor (Sentro ng Wika at Kultura)">
                        Library - 3rd Floor (Sentro ng Wika at Kultura) 
                      </option>
                      <option value="L174-4F1D2E3C8B |  Library - Basement (Graduate School Lawang)">
                        Library - Basement (Graduate School Lawang) 
                      </option>
                    </Form.Select>
                  </div>

                  {/** EMAIL INPUT FIELD */}
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="email"
                      type="email"
                      placeholder="Institutional Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1.rem",
                        height: "2.8rem",
                      }}
                      className="custom-input"
                    />
                  </InputGroup>

                  {/** PASSWORD INPUT FIELD */}
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1.rem",
                        height: "2.8rem",
                      }}
                        autoComplete="new-password"
                      className="custom-input"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="Confirm password"
                      type="password"
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1.rem",
                        height: "2.8rem",
                      }}
                        autoComplete="new-password"
                      className="custom-input"
                    />
                  </InputGroup>

                  <Button
                    type="submit"
                    className="w-100"
                    onClick={toggleCodeModal}
                    style={{
                      backgroundColor: "#0760A1",
                      fontFamily: "Helvetica",
                      border: "none",
                      fontSize: "1rem",
                      height: "2.8rem",
                      borderRadius: "1.5rem",
                    }}
                  >
                    SEND VERIFICATION CODE
                  </Button>
                 



                  {/*showCodeModal*/}
     <Modal show={showCodeModal} onHide={toggleCodeModal} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="p-2" style={{ padding: "0 24px" }}>
            
              <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                <img src="https://res.cloudinary.com/dvhfgstud/image/upload/v1732194851/authentication_jdckfv.png"  alt="Company Logo" draggable="false"    style={{ width: "90px", height: "90px" }}/>
                <h6 className="mt-3">Verify your account</h6>
                <p className="text-center text-muted" style={{ maxWidth: "300px", fontSize: "14px", marginTop: "8px" }}> Enter the verification code sent to your email address below.  </p>
              </div>

              <div style={{ margin: "0 auto", maxWidth: "350px" }}>
              <Form onSubmit={(e) => { e.preventDefault();   verifyPinAndRegister() ; }}>
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



          <Modal show={errorModal} centered>
                  <Modal.Body style={{ 
                    backgroundColor: errorColor, 
                    borderRadius: '0px', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: 0,
                  }}>
                    <img 
                      src={errorIcon} 
                      alt="no internet" 
                      height="70px" 
                      width="70px" 
                      draggable={false} 
                      style={{
                        marginBottom: "1.5em",
                        marginTop:'2rem'
                      }}
                    />
                    <p style={{
                      color: 'black',
                      textAlign:'center',
                      margin:'.5rem'
                    }}>
                      {errorMessage}
                    </p>
                    <div style={{
                      display:'flex',
                      backgroundColor: errorDiv,
                      width:'100%',
                      padding: '10px',
                      marginTop:'1em',
                      justifyContent:'center'
                    }}>
                      {errorMessage.includes('already registered') ? (
                        <h6 style={{color:'white'}}>Redirecting in <span style={{color:'red'}}>{time}</span> seconds...</h6>
                      ) : (
                        <Button
                          onClick={() => setShowErrorModal(false)}
                          variant="light"
                          size="sm"
                          style={{
                            borderRadius: '0',
                            backgroundColor:'transparent',
                            paddingLeft: '20px',
                            border:'none',
                            color:'white',
                            fontSize:'1rem',
                            fontWeight:'bold',
                            paddingRight: '20px',
                            marginTop:'.3em',
                            marginBottom:'.4em'
                          }}
                        >
                          Dismiss
                        </Button>
                      )}
                    </div>
                  </Modal.Body>
          </Modal>


                      







                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: ".8px",
                        backgroundColor: "#00000080",
                      }}
                    />
                    <h6 style={{ margin: "0 1rem" }} className="text-center">
                      or
                    </h6>
                    <div
                      style={{
                        flex: 1,
                        height: ".8px",
                        backgroundColor: "#00000080",
                      }}
                    />
                  </div>

                  {/** SIGN UP WITH GOOGLE */}
                  <Button onClick={signupAsGoogleHandler}
                 className="w-100 d-flex align-items-center justify-content-center mb-2"

                    style={{
                      backgroundColor: "#F1F1F1",
                      fontFamily: "Helvetica",
                      border: "1px solid #00000080",
                      fontSize: "1rem",
                      height: "2.8rem",
                      borderRadius: "1.5rem",
                      color: "#0760A1",
                      paddingLeft: "0.5rem",
                    }}
                    
                  >
                    <img
                      src="../images/GOOGLE_LOGO.png"
                      alt="Google Logo"
                      style={{
                        width: "28px",
                        height: "28px",
                        marginLeft: "0.5rem",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        flexGrow: 1,
                        textAlign: "center",
                        marginRight: "2rem",
                      }}
                    >
                      Sign up with Google
                    </span>{" "}
                  </Button>
                  
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      fontFamily: "Helvetica",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      This site is protected by reCAPTCHA
                    </p>
                    <p style={{ margin: 0 }}>
                      {/** GOOGLE PRIVACY  */}
                      <a
                        href="https://policies.google.com/privacy"
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          textDecoration: "none",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Privacy
                      </a>
                      <span style={{ margin: "0 0.25rem" }}>and</span>
                      {/** TERMS OF SERVICE  */}
                      <a
                        href="https://policies.google.com/terms"
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          textDecoration: "none",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </a>
                      <span style={{ marginLeft: "0.25rem" }}>apply</span>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/** ALREADY HAVE AN ACCOUNT */}
          <div className="text-center">
            <h6
              style={{
                color: "#767676",
                marginTop: "5rem",
                fontFamily: "Helvetica",
                fontWeight: "600",
              }}
            >
              Already have an Account?{" "}
              <a
                href="/"
                style={{
                  color: "#CD8800",
                  textDecoration: "none",
                  fontFamily: "Helvetica",
                  fontWeight: "600",
                }}
              >
                Log in
              </a>
            </h6>
          </div>
        </Row>
      </Container>
    </>
  
  );
}

export default SignupGoogle;
