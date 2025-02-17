import axios from "axios";
import { apiUrl } from "../constants/env";

const API = axios.create({
    baseURL: apiUrl
});

export const handleLogin = async (email: string, password: string) => {
    try {
        const response = await API.post('/auth/login', {
                email: email, 
                password: password 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );
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
}

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