import React from "react";

{/** USER INTERFACES */}
import UserLandingPage from "./pages/UserLandingPage";
import SignupGoogle from "./pages/SignupGoogle";
import UserHomePage from "./pages/UserHomePage";

import AuthorityToTravelForm from "./pages/AuthorityToTravelForm"
import RequestToTravelForm from "./pages/RequestToTravelForm";

import ForgotPassword from "./pages/ForgotPassword";
import RecoverAccount from "./pages/RecoverAccount";
import AboutUs from "./pages/AboutUs";
import UserGuide from "./pages/UserGuide";
import Request from "./pages/Request";
import UserProfile from "./pages/UserProfile";
import PasswordInformation from "./pages/PasswordInformation";

{/** GSU's SUPERVISOR INTERFACES */}
import AdminLandingPage from "./pages/MOTORPOOL/AdminLandingPage";
import MotorpoolHomePage from "./pages/MOTORPOOL/MotorpoolHomePage";

{/** GSU's HEAD INTERFACES */}

import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  return <AdminLandingPage />;
}

export default App;
