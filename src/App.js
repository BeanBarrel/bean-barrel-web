



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import Dashboard from './Pages/SidebarHolder.jsx';
import ProtectedRoute from "./auth/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/admin" element={<LoginPage />} />
           <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
     
      </Routes>
    </Router>
  );
}

export default App;
