import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Project from "./page/Project";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Project />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
