import axios from "axios";
import { apiUrl } from "../constants/env";

const API = axios.create({
    baseURL: apiUrl
});

API.interceptors.request.use((config) => {
    const sessionToken = sessionStorage.getItem('session_token');
    if (sessionToken) {
        config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

export const handleLogin = async (email: string, password: string) => {
    try {
        const response = await API.post('/auth/login', {
                email: email, 
                password: password 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        if (response.status === 200 && response.data.sessionToken && response.data) {
            sessionStorage.setItem('sessionToken', response.data.sessionToken);
        }
        return response;
    } catch (error) {
        console.error(`Error during login: ${error}`);
        throw error;
    }
};

export const handleRegister = async (username: string, email: string, password: string) => {
    try {
        const response = await API.post('/auth/register', {
            username: username,
            email: email,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error(`Error during registration: ${error}`);
        throw error;
    }
};

export const handleLogout = async () => {
    try {
        const response = await API.get('/auth/logout');
        return response;
    } catch (error) {
        console.error(`Error during logout: ${error}`);
        throw error;
    }
};

export const getGitHubUserData = async () => {
    try {
        const response = await API.get('/auth/getUserData', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(`Error getting user data: ${error}`);
        throw error;
    }
};