import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedRecipes = () => {
  const [savedMeals, setSavedMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedMeals')) || [];
    setSavedMeals(saved);
  }, []);

  const handleRemove = (idMeal) => {
    const updated = savedMeals.filter((meal) => meal.idMeal !== idMeal);
    setSavedMeals(updated);
    localStorage.setItem('savedMeals', JSON.stringify(updated));
  };

  // Helper to build a list of ingredients with measures
  const getIngredientsList = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient1`.replace('1', i)];
      const measure = meal[`strMeasure1`.replace('1', i)];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure?.trim() || ''} ${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <button onClick={() => navigate('/')}>Go back/Home</button>
        <button onClick={() => navigate('/search')}>Search more</button>
      </div>

      <h2>Saved Recipes</h2>

      {savedMeals.length === 0 ? (
        <p>No recipes saved yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {savedMeals.map((meal) => (
            <div key={meal.idMeal} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
              <h3>{meal.strMeal}</h3>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: '300px', borderRadius: '10px' }}
              />
              <p><strong>Category:</strong> {meal.strCategory}</p>
              <p><strong>Area:</strong> {meal.strArea}</p>

              <h4>Instructions</h4>
              <p style={{ whiteSpace: 'pre-wrap' }}>{meal.strInstructions}</p>

              <h4>Ingredients</h4>
              <ul>
                {getIngredientsList(meal).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {meal.strYoutube && (
                <p>
                  <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                  </a>
                </p>
              )}

              <button onClick={() => handleRemove(meal.idMeal)} style={{ marginTop: '10px' }}>
                Remove from saved
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
