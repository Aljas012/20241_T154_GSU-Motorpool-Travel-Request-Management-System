import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**ADMIN INTERFACES */
import AdminLandingPage from "./pages/MOTORPOOL/AdminLandingPage";
import MotorpoolHomePage from "./pages/MOTORPOOL/MotorpoolHomePage";
//import MotorpoolHomePage from "./pages/MOTORPOOL/MotorpoolHomePage";







/** USER INTERFACES */
//import loginAsGoogle from "./pages/goole";
import UserLandingPage from "./pages/UserLandingPage";
import SignupGoogle from "./pages/SignupGoogle";
import UserHomePage from "./pages/UserHomePage";
import AuthorityToTravelForm from "./pages/AuthorityToTravelForm";
import RequestToTravelForm from "./pages/RequestToTravelForm";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverAccount from "./pages/RecoverAccount";
import ViewRequest from "./pages/MOTORPOOL/ViewRequest";  
import AboutUs from "./pages/AboutUs";
import UserGuide from "./pages/UserGuide";
import Request from "./pages/Request";
import Profile from "./pages/UserProfile";
import PrivateRoute from "./routeChecker";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProtectedRoute from "./routeChecker";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route index element={<UserLandingPage />} />
        
        <Route path="/admin/AdminLandingPage" element={<AdminLandingPage/>} />
      


        <Route path="/user/signup_google" element={<SignupGoogle />} />
        <Route path="/user/forgot_password" element={<ForgotPassword />} />
        <Route path="/user/recover_account" element={<RecoverAccount />} />
        <Route path="/user/" element = {<loginAsGoogle />}/>

        <Route element={<ProtectedRoute />}>  
        <Route path="/admin/view_request/:id/:userId" element={<ViewRequest />} />
          <Route path="/admin/homepage" element={<MotorpoolHomePage />} />
          <Route path="/user/:id/homepage" element={<UserHomePage />} />  
          <Route path="/user/att_forms" element={<AuthorityToTravelForm />} />
          <Route path="/user/request_forms" element={<RequestToTravelForm />} />
          <Route path="/user/about_us" element={<AboutUs />} />
          <Route path="/user/user_guide" element={<UserGuide />} />
          <Route path="/user/request" element={<Request />} />
          <Route path="/user/:id/profile" element={<Profile />} />
          {'<Route path="/user/att_forms/download" element={<AuthorityToTravelFormDownload />} />'}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
