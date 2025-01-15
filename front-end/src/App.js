import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
//import Assistance from './pages/Assistance';
//import TrainModel from './pages/TrainModel';

import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/dashboard" element = {<Dashboard /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;