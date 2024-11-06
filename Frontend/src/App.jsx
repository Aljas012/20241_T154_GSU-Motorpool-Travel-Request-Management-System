import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/** USER INTERFACES */
import UserLandingPage from "./pages/UserLandingPage";
import SignupGoogle from "./pages/SignupGoogle";
import UserHomePage from "./pages/UserHomePage";
import AuthorityToTravelForm from "./pages/AuthorityToTravelForm";
import RequestToTravelForm from "./pages/RequestToTravelForm";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverAccount from "./pages/RecoverAccount";
import AboutUs from "./pages/AboutUs";
import UserGuide from "./pages/UserGuide";
import Request from "./pages/Request";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<UserLandingPage />} />
          <Route path="/user/homepage" element={<UserHomePage />} />
          <Route path="/user/signup_google" element={<SignupGoogle />} />
          <Route path="/user/att_forms" element={<AuthorityToTravelForm />} />
          <Route path="/user/request_forms" element={<RequestToTravelForm />} />
          <Route path="/user/forgot_password" element={<ForgotPassword />} />
          <Route path="/user/recover_account" element={<RecoverAccount />} />
          <Route path="/user/about_us" element={<AboutUs />} />
          <Route path="/user/user_guide" element={<UserGuide />} />
          <Route path="/user/request" element={<Request />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
