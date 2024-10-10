import React, { useState } from 'react';
import RegistrationForm from '../components/Login/Registrationform';
import { Registration } from '../Services/login-services';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        role: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate=useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const SubmitForm = (event) => {
        event.preventDefault(); 
        setError(null);

      
        Registration(formData)
            .then((resp) => {
                console.log('Success:', resp);
                navigate('/api/auth/login')
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Registration failed. Please try again.');
            });
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <RegistrationForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={SubmitForm}
            />
        </div>
    );
};

export default RegistrationPage;

