import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CardList from './components/CardList';
import Profile from './components/Profile';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
      fetchUsers(token);
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Simulated token; replace with real one later
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Error fetching users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="container">
        {isAuthenticated && (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
        <Routes>
          <Route path="/" element={isAuthenticated ? <CardList users={users} setUsers={setUsers} /> : <Navigate to="/login" />} />
          <Route path="/profile/:id" element={<Profile users={users} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
