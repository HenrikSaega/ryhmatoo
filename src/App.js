import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import Meals from './pages/Meals';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './assets/styles/App.css'
import './assets/styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/saved" element={<SavedRecipes />} />
      </Routes>
    </Router>
  );
};

export default App;
