import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import countryAndStates from '../country-states';
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Services/auth";


function SubmitingBlockDetails({ formData, setFormData }) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [blockNumbers, setBlockNumbers] = useState([]);
    const [selectedState, setSelectedState] = useState(''); 
    const [selectedBlock, setSelectedBlock] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(''); 

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login'); 
        }
        const countryList = Object.entries(countryAndStates.country);
        setCountries(countryList);
    }, [navigate]);

    useEffect(() => {
        if (formData.countryName) {
            setStates(countryAndStates.states[formData.countryName] || []);
        } else {
            setStates([]);
        }
    }, [formData.countryName]);

    useEffect(() => {
        const blocks = Array.from({ length: 500 }, (_, i) => i + 1);
        setBlockNumbers(blocks);
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const saveData = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        console.log('Stored Token:', token); 
    
        if (!token) {
            console.error('Token is missing, please login.');
            setErrorMessage('Token is missing, please login.'); 
            return; 
        }
    
        const countryName = countries.find(([code, name]) => code === formData.countryName)?.[1]; 
        const stateName = selectedState;
    
        try {
            const response = await fetch(`http://localhost:8080/api/submit-data?countryName=${countryName}&stateName=${stateName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                console.log('Data submitted successfully');
                setSubmitSuccess(true);
                setErrorMessage(''); 
                
                // Reset form fields
                setFormData({
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
                setSelectedState('');
                setSelectedBlock('');
            } else {
                const errorMessage = await response.text();
                console.error('Error submitting data:', errorMessage);
                setSubmitSuccess(false);
                setErrorMessage(errorMessage); 
            }
        } catch (error) {
            console.error('Request failed:', error);
            setSubmitSuccess(false);
            setErrorMessage('Request failed: ' + error.message); 
        }
    };
    
    

    return (
        <Container>
            <form onSubmit={saveData}>
                <div className="mb-3">
                    <label htmlFor="country">Choose Country:</label>
                    <select
                        id="country"
                        name="countryName"
                        value={formData.countryName}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Country</option>
                        {countries.map(([code, name]) => (
                            <option key={code} value={code}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="state">Choose a State:</label>
                    <select
                        id="state"
                        name="stateName"
                        value={selectedState} 
                        onChange={(e) => {
                            setSelectedState(e.target.value);
                            handleInputChange(e);
                        }}
                    >
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state.name} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="blockNumber">Choose a Block Number:</label>
                    <select
                        id="blockNumber"
                        name="blockNumber"
                        value={selectedBlock} 
                        onChange={(e) => {
                            setSelectedBlock(e.target.value);
                            handleInputChange(e);
                        }}
                    >
                        <option value="">Select Block</option>
                        {blockNumbers.map((blockNumber) => (
                            <option key={blockNumber} value={blockNumber}>
                                {blockNumber}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="totalPopulation">Enter Total Population:</label>
                        <input
                            type="number"
                            id="totalPopulation"
                            name="totalPopulation"
                            value={formData.totalPopulation}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="malePopulation">Enter Male Population:</label>
                        <input
                            type="number"
                            id="malePopulation"
                            name="malePopulation"
                            value={formData.malePopulation}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="femalePopulation">Enter Female Population:</label>
                        <input
                            type="number"
                            id="femalePopulation"
                            name="femalePopulation"
                            value={formData.femalePopulation}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <label htmlFor="totalEducated">Enter Total Educated:</label>
                        <input
                            type="number"
                            id="totalEducated"
                            name="totalEducated"
                            value={formData.totalEducated}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="maleEducated">Enter Male Educated:</label>
                        <input
                            type="number"
                            id="maleEducated"
                            name="maleEducated"
                            value={formData.maleEducated}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="femaleEducated">Enter Female Educated:</label>
                        <input
                            type="number"
                            id="femaleEducated"
                            name="femaleEducated"
                            value={formData.femaleEducated}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <label htmlFor="avgAge">Enter Avg Age:</label>
                        <input
                            type="number"
                            id="avgAge"
                            name="avgAge"
                            value={formData.avgAge}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row justify-content-center mt-4">
                    <div className="col-md-3">
                        <input type="submit" value="Submit" />
                    </div>
                </div>

                {/* Display success message if form was submitted successfully */}
                {submitSuccess && (
                    <div className="alert alert-success mt-4">
                        Data submitted successfully!
                    </div>
                )}

                {/* Display error message if there's an error */}
                {errorMessage && (
                    <div className="alert alert-danger mt-4">
                        {errorMessage}
                    </div>
                )}
            </form>
        </Container>
    );
}

export default SubmitingBlockDetails;
