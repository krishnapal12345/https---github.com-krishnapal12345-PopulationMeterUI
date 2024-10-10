import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import RegistrationPage from './pages/RegistrationPage';
import UserPage from  './pages/UserPage';
import AdminPage from './pages/AdminPage';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/auth/login" element={<LoginForm />} />
        <Route path="/api/auth/Registration" element={<RegistrationPage/>}></Route>
        <Route path="/api/user-page" element={<UserPage/>}></Route>
        <Route path="/api/admin-page" element={<AdminPage/>}></Route>
        <Route path="/api/about-us" element={<AboutUsPage/>}></Route>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;

