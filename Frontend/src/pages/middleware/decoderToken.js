import { jwtDecode } from 'jwt-decode'; // Named import
export default function decodeAndStoreUserInfo() {
    const token = localStorage.getItem('auth_token'); // Get the token from localStorage

    // Check if a token is available in localStorage
    if (!token) {
        console.error('No token found. User is not logged in.');
        return;
    }

    try {
        // Decode the token using jwtDecode function
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if the token is expired
        if (decoded.exp < currentTime) {
            localStorage.removeItem('generateToken'); // Remove token if expired
            localStorage.removeItem('userInfo'); // Remove user info
            console.error('Token has expired');
            return;
        }

    

        console.log('User info stored in localStorage');
    } catch (error) {
        console.error('Error decoding token:', error);
    }
};