import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SubmitingBlockDetails from '../components/Admin/SubmitingBlockDetails';

const AdminPage = () => {
    const [formData, setFormData] = useState({
        countryName: '',
        stateName: '',
        blockNumber: '',
        totalPopulation: '',
        malePopulation: '',
        femalePopulation: '',
        totalEducated: '', 
        maleEducated: '',
        femaleEducated: '',
        avgAge: ''
    });

    const handleFormSubmit = async (data) => {
        
        console.log("Form submitted with data:", data);
        
    };

    return (
        <div>
            <Navbar />
            <SubmitingBlockDetails formData={formData} setFormData={setFormData} onFormSubmit={handleFormSubmit} />
        </div>
    );
};

export default AdminPage;
