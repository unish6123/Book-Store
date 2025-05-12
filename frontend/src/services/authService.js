
import axios from 'axios';


const API_URL = 'http://localhost:4000/api/auth'; 
// Login request
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signIn`, { email, password }, { withCredentials: true, credentials: 'include' });
        if (response.status === 200) {
            return response.data; 
        }
        throw new Error('Invalid credentials');
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};


// Register request
export const register = async (userDetails) => {
    try {
        const response = await axios.post(`${API_URL}/signUp`, userDetails, {
            withCredentials: true, credentials: 'include'
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

// Forgot password request
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/sendForgotPasswordOtp`, { email }, {
            withCredentials: true
        });
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Forgot password failed');
    }
};

// Resend OTP request
export const resendOTP = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/resend-otp`, { email }
            , { withCredentials: true });
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Resend OTP failed');
    }
};
