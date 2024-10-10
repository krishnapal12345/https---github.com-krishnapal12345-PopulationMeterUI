import { myAxios } from "./helper";

// Registration function
export const Registration = async (user) => {
    try {
        const response = await myAxios.post('/api/auth/registration', user, { withCredentials: true });
        
        return response.data; 
    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.response && error.response.data) {
            throw new Error(`Registration failed: ${error.response.data.message || error.response.data}`);
        }
        throw new Error('Registration failed due to a network error.');
    }
}

// Login function
export const loginUser = (loginDetails) => {
    return myAxios.post('/api/auth/login',loginDetails).then((response)=>response.data)
    
}
