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
    <div className='main'>
      <div className='btn-container'>
        <button className='btn' onClick={() => navigate('/')}>Go back/Home</button>
        <button className='btn' onClick={() => navigate('/search')}>Search more</button>
      </div>
      {/* Main Content - Either Show Meal Details or Message */}
      <div className='row-container'>
        <div className='meal-view card col-md-11'>
          {meal ? (
            <>
              <h2>{meal.strMeal}</h2>

              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className='meal-img'
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
                className='btn'>
                Save Meal
              </button>
            </>
          ) : (
            <h2>Select a saved meal from the list.</h2>
          )}
        </div>
        {/* Sidebar: Always Show Saved Meals */}
        <div>
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
    </div>
  );
};

export default SavedRecipes;
