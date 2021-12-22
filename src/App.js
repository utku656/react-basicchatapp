import React from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen/index'
import ChatScreen from './components/ChatScreen/index'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
