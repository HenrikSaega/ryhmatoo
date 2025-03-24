import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMeals } from '../service/Api';

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
    <div style={{ padding: '20px' }}>
      <div>
        <button onClick={() => navigate('/')}>Go back/Home</button>
        <button onClick={() => navigate('/search')}>Search</button>
        <button onClick={() => navigate('/saved')}>Saved recipes</button>
      </div>

      <h2>Meals</h2>

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Main meal results */}
        <div style={{ flex: 3 }}>
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
                    onClick={() => navigate('/saved', { state: { meal } })} // Navigate to detailed view
                  />
                  <h4>{meal.strMeal}</h4>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Saved meals */}
        <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
          <h3>Saved Meals</h3>
          {savedMeals.length === 0 ? (
            <p>No saved meals</p>
          ) : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {savedMeals.map((meal) => (
                <li key={meal.idMeal} style={{ marginBottom: '10px' }}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    style={{ width: '50px', borderRadius: '5px', marginRight: '10px', verticalAlign: 'middle' }}
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
