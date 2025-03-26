import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/SavedRecipes.css'

const SavedRecipes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const meal = location.state?.meal || null; // Get the passed meal from Meals.js
  const [savedMeals, setSavedMeals] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedMeals')) || [];
    setSavedMeals(saved);
  }, []);

  const handleSaveMeal = () => {
    if (!meal) return;
    const saved = JSON.parse(localStorage.getItem('savedMeals')) || [];
    const isAlreadySaved = saved.find((m) => m.idMeal === meal.idMeal);
    if (!isAlreadySaved) {
      const updated = [...saved, meal];
      localStorage.setItem('savedMeals', JSON.stringify(updated));
      setSavedMeals(updated);
      alert(`${meal.strMeal} saved!`);
    } else {
      alert(`${meal.strMeal} is already saved.`);
    }
  };

  return (
    <div className='main' style={{ display: 'flex', padding: '20px', gap: '30px' }}>
      {/* Main Content - Either Show Meal Details or Message */}
      <div style={{ flex: 3 }}>
        <div>
          <button onClick={() => navigate('/')}>Go back/Home</button>
          <button onClick={() => navigate('/search')}>Search more</button>
        </div>

        {meal ? (
          <>
            <h2>{meal.strMeal}</h2>

            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: '300px', borderRadius: '10px' }}
            />

            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p>

            <h4>Ingredients:</h4>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return ingredient ? <li key={i}>{measure} {ingredient}</li> : null;
              })}
            </ul>

            <h4>Instructions:</h4>
            <p>{meal.strInstructions}</p>

            <button
              onClick={handleSaveMeal}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
              }}>
              Save Meal
            </button>
          </>
        ) : (
          <h2>Select a saved meal from the list.</h2>
        )}
      </div>

      {/* Sidebar: Always Show Saved Meals */}
      <div className='card p-2 saved-meals'>
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
  );
};

export default SavedRecipes;
