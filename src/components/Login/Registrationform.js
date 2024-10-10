import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';


function RegistrationForm({ formData, onInputChange, onSubmit }) {

  

  const handleRoleChange = (event) => {
    onInputChange({
      target: {
        name: 'role',
        value: event.target.value.toUpperCase() 
      }
    });
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto ' style={{ borderRadius: '1rem', maxWidth: '600px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Registration</h2>
              <p className="text-white-50 mb-5">Please enter your details to Register</p>

              <form onSubmit={onSubmit}>
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Full Name'
                  id='fullname'
                  type='text'
                  size="lg"
                  name="fullname"
                  value={formData.fullname}
                  onChange={onInputChange}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='UserName'
                  id='username'
                  type='text'
                  size="lg"
                  name="username"
                  value={formData.username}
                  onChange={onInputChange}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Role'
                  id='role'
                  type='text'
                  size="lg"
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                />

                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Password'
                  id='password'
                  type='password'
                  size="lg"
                  name="password"
                  value={formData.password}
                  onChange={onInputChange}
                />

                <MDBBtn outline className='mx-2 px-5 no-hover-effect' color='white' size='lg' type="submit">
                  Register
                </MDBBtn>
              </form>

              <div>
                <p className="mb-0">Already have an account? <a href="/api/auth/login" className="text-white-50 fw-bold">Login</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegistrationForm;

