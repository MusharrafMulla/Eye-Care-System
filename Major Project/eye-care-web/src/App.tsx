// import React, { useState } from 'react';
// import RegistrationForm from './components/RegistrationForm';
// import LoginForm from './components/LoginForm';
// import './styles/App.css'; // Import your global styles (if any)

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to handle successful login
//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <div className="App">
//        <h1>Eye Care App</h1>
      
//       {!isLoggedIn ? (
//         <div>
//           <RegistrationForm />
//           <LoginForm onLoginSuccess={handleLoginSuccess} />
//         </div>
//       ) : ( 
//         <div>
//           <h2>Welcome to your Dashboard!</h2>
//           {/* Render the appointment form or dashboard after login */}
//         </div>
//       )} 
//     </div>
//   );
// };

// export default App;


// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DoctorList from './pages/DoctorList';
import ConfirmationPage from './pages/ConfirmationPage';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
