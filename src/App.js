import React from 'react';
import "./styles.css";
import Community from './pages/Community';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Auth/Login';
import { Protected } from './components/Protected/Protected';

export default function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      <Protected>
          <Community />
        </Protected>
    </div>
  );
}