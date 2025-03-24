// Meals.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMeals } from '../service/Api'; // Make sure fetchMeals is set to dynamically fetch meals

const Meals = () => {

  const navigate = useNavigate(); // Hook to navigate between pages
  const location = useLocation();
  const { searchType, searchValue } = location.state || {};
  const [meals, setMeals] = useState([]);


  const handleSaveMeal = (meal) => {
    const saved = JSON.parse(localStorage.getItem('savedMeals')) || [];

    // Avoid duplicates
    const isAlreadySaved = saved.find((m) => m.idMeal === meal.idMeal);
    if (!isAlreadySaved) {
      saved.push(meal);
      localStorage.setItem('savedMeals', JSON.stringify(saved));
      alert(`${meal.strMeal} saved!`);
    } else {
      alert(`${meal.strMeal} is already saved.`);
    }
  };
  useEffect(() => {
    const getMeals = async () => {
      if (searchType) {
        const data = await fetchMeals(searchType, searchValue);
        setMeals(data);
      }
    };
    getMeals();
  }, [searchType, searchValue]);

  return (
    <div style={{ padding: '20px' }}>

      <div>
        <button onClick={() => navigate('/')}>Go back/Home</button>
        <button onClick={() => navigate('/search')}>Search</button>
        <button onClick={() => navigate('/saved')}>Saved recipes</button>
      </div>
      <h2>Meals</h2>

      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {meals.map((meal) => (
            <div key={meal.idMeal} style={{ width: '200px', textAlign: 'center' }}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: '100%', borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => handleSaveMeal(meal)}
              />
              <h4>{meal.strMeal}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
