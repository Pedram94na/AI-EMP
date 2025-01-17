import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GlobalStateProvider } from './utils/gloablStateContext.js';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Blog from './pages/Blog.js';

import './App.css';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/profile" element = {<Profile /> }/>
            <Route path = "/blog" element = {<Blog /> }/>
          </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;