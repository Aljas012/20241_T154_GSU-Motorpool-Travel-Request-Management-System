import { jwtDecode } from 'jwt-decode'; // Named import
export default function decodeAndStoreUserInfo() {
    const token = localStorage.getItem('auth_token'); // Get the token from localStorage
    if (!token) {
        console.error('No token found. User is not logged in.');
        return;
    }
    try {
        // Decode the token using jwtDecode function
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decoded.exp < currentTime) {
            localStorage.removeItem('generateToken'); 
            localStorage.removeItem('userInfo');
            console.error('Token has expired');
            return;
        }
        console.log('User info stored in localStorage');
    } catch (error) {
        console.error('Error decoding token:', error);
    }
};