
import React from 'react'
import Navbar from '../components/Navbar';
import UserDashboard from '../components/User/UserDashboard';

const UserPage= () =>{
    return(
        <div>
            <Navbar/>
            <UserDashboard/>
        </div>
    );
}
export default UserPage;