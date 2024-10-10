import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import countryAndStates from '../country-states';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';


function UserDashboard() {
  const [formData, setFormData] = useState({
    countryName: '',
    stateName: '',
    blockNumber: '',
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [blockNumbers, setBlockNumbers] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [genderData,setGenderData]=useState(null);
  const [educationData,setEducationData]=useState(null);

  // Populate country dropdown on component mount
  useEffect(() => {
    const countryList = Object.entries(countryAndStates.country);
    setCountries(countryList);
  }, []);

  // Populate state dropdown when country changes
  useEffect(() => {
    if (selectedCountry) {
      setStates(countryAndStates.states[selectedCountry] || []);
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Populate block numbers (1 to 500)
  useEffect(() => {
    const blocks = Array.from({ length: 500 }, (_, i) => i + 1);
    setBlockNumbers(blocks);
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setFormData({ ...formData, countryName: event.target.value });
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setFormData({ ...formData, stateName: event.target.value });
  };

  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
    setFormData({ ...formData, blockNumber: event.target.value });
  };

  const getGraphData = async (e) => {
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
      const genderResponse = await fetch(`http://localhost:8080/api/get-Gender-graph?countryName=${countryName}&stateName=${stateName}&blockNumber=${selectedBlock}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const eduResponse=await fetch(`http://localhost:8080/api/get-edu-graph?countryName=${countryName}&stateName=${stateName}&blockNumber=${selectedBlock}`,{
        method: 'GET',
        headers:{
          'content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })

      if (genderResponse.ok && eduResponse.ok) {
        const genderData = await genderResponse.json();
        const eduData=await eduResponse.json();
        console.log('Data fetched successfully:', {genderData,eduData});
        setGenderData(genderData);
        setEducationData(eduData)
        setSubmitSuccess(true);
        setErrorMessage('');
        
      } else {
        const errorMessage = await genderResponse.text() || await eduResponse.text();
        console.error('Error fetching data:', errorMessage);
        setSubmitSuccess(false);
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('Request failed:', error);
      setSubmitSuccess(false);
      setErrorMessage('Request failed: ' + error.message);
    }
  };
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderGenderChart = () => {
    if (!genderData || genderData.length === 0) return <p>No gender data available</p>;

    const data = [
      { name: 'Male', value: genderData[0].maleCount },
      { name: 'Female', value: genderData[0].femaleCount}
    ];

    return (
      <div>
        <h3>Gender Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderEducationChart = () => {
    if (!educationData || educationData.length === 0) return <p>No education data available</p>;

    const data = [
      { name: 'Male Educated', value: educationData[0].maleValue},
      { name: 'Female Educated', value: educationData[0].femaleValue }
    ];

    return (
      <div>
        <h3>Education Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Container>
      <div className="banner">
        
      </div>
      <form onSubmit={getGraphData}>
        <div className="mb-3">
          <label htmlFor="country">Choose Country:</label>
          <select id="country" name="country" value={selectedCountry} onChange={handleCountryChange}>
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
          <select id="state" name="statecode" value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="BlockNumber">Choose a Block Number:</label>
          <select id="BlockNumber" name="BlockNumber" value={selectedBlock} onChange={handleBlockChange}>
            <option value="">Select Block</option>
            {blockNumbers.map((blockNumber) => (
              <option key={blockNumber} value={blockNumber}>
                {blockNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-3">
            <input type="submit" value="Get Education Data" />
          </div>
        </div>
      </form>
      {submitSuccess && <p>Data fetched successfully!</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {genderData && renderGenderChart()}
      {educationData && renderEducationChart()}
    </Container>
  );
}

export default UserDashboard;