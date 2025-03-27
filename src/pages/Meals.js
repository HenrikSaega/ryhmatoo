import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMeals } from '../service/Api';
import '../assets/styles/main.css'

const Meals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchType, searchValue } = location.state || {};
  const [meals, setMeals] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      if (searchType) {
        const data = await fetchMeals(searchType, searchValue);
        setMeals(data);
      }
    };
    getMeals();
    const saved = JSON.parse(localStorage.getItem('savedMeals')) || [];
    setSavedMeals(saved);
  }, [searchType, searchValue]);

  return (
    <div className='main'>
      <div className='btn-container'>
        <button className='btn' onClick={() => navigate('/')}>🏠 Home</button>
        <button className='btn mx-3' onClick={() => navigate('/search')}>🔍 Search Meals</button>
        {/* <button className='btn' onClick={() => navigate('/saved')}>💾 Saved Meals</button> */}
      </div>


      <div className='row-container'>
        <div className='meal-view card col-md-11'>
          <h2>Meals</h2>
          {meals.length === 0 ? (
            <p>No meals found.</p>
          ) : (
            <div className='meal-grid'>
              {meals.map((meal) => (
                <div key={meal.idMeal} className='meal-item'>
                  <img
                    className='meal-img'
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    onClick={() => navigate('/saved', { state: { meal } })} // Navigate to detailed view
                  />
                  <h4>{meal.strMeal}</h4>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Always Show Saved Meals */}
        <div className='card saved-meals col-md-3'>
          <h3>Saved Meals</h3>
          {savedMeals.length === 0 ? (
            <p>No saved meals</p>
          ) : (
            <ul className='list'>
              {savedMeals.map((meal) => (
                <li key={meal.idMeal} className='list-items'
                  onClick={() => navigate('/saved', { state: { meal } })} // Navigate to show details
                >
                  <img
                    className='list-item'
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                  />
                  <span>{meal.strMeal}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meals;
