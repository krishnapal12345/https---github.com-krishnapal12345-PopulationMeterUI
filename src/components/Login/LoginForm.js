import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { loginUser } from '../../Services/login-services';
import { doLogin } from '../../Services/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css'


function LoginForm() {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log(loginDetails);
    
    try {
      const data = await loginUser(loginDetails); 
      console.log("user login: ", data);
      
      if (data.token) { 
        localStorage.setItem('token', data.token); 
        doLogin(data, () => {
          console.log("saved to localstorage");
        });

        if(data.role === "ROLE_ADMIN") {
          navigate('/api/admin-page');
        } else if(data.role === "ROLE_USER") {
          navigate('/api/user-page');
        } else {
          console.log("Unknown Role");
        }
      } else {
        console.log("Token is missing in response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <h3>Login</h3>
              <p>Please enter your login and password!</p>
              
              <form onSubmit={handleSubmit}>
                <MDBInput
                  label="Username"
                  name="username"
                  type="text"
                  value={loginDetails.username}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  label="Password"
                  name="password"
                  type="password"
                  value={loginDetails.password}
                  onChange={handleChange}
                  required
                />
                <MDBBtn type="submit">Login</MDBBtn>
              </form>
              <p>
                Forgot password? <a href="/forgot-password">Click here</a>
              </p>
              <p>
                Don't have an account? <a href="/register">Sign Up</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
