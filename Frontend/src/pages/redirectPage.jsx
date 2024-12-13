import { useEffect } from "react";
import { useNavigate } from "react-router-dom";





const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const params = new URLSearchParams(window.location.search);

      params.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const token = params.get("token");
      const userInfo = {
        user_id: params.get("id"),
        name: params.get("name"),
        email: params.get("email"),
        office_code: params.get("office_code"),
        college_name: params.get("college_name"),
      };
      console.log("Extracted user info:", userInfo);

      if (token) {
        // Perform async operations
        await localStorage.setItem("auth_token", token);
        await localStorage.setItem("user_info", JSON.stringify(userInfo));
        console.log("Redirecting to homepage...");
        navigate(`/user/id=${userInfo.user_id}/homepage`, { replace: true });
      } else {
        console.warn("No valid token found. Clearing user data.");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_info");
      }
    };

    // Call the async function
    handleRedirect();
  }, [navigate]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default RedirectPage;
