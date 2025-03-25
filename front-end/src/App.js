import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GlobalStateProvider } from './utils/globalStateContext.js';
import { ProtectedRoute } from './utils/protectedRoute.js';

import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Blog from './pages/Blog.jsx';

import './App.css';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/blog" element = {<Blog /> }/>

            <Route element = {<ProtectedRoute />}>
              <Route path = "/profile" element = {<Profile /> }/>
            </Route>
          </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;