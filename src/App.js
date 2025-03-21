import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import Meals from './pages/Meals';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} /> 
        <Route path="/meals" element={<Meals />} /> 
      </Routes>
    </Router>
  );
};

export default App;
