import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GlobalStateProvider } from './utils/gloablStateContext.js';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog.js';

import './App.css';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/dashboard" element = {<Dashboard /> }/>
            <Route path = "/blog" element = {<Blog /> }/>
          </Routes>
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;