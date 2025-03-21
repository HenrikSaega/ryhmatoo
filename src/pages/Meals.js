// Meals.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMeals } from '../service/Api'; // Make sure fetchMeals is set to dynamically fetch meals

const Meals = () => {
  const { state } = useLocation(); // Get the passed state (searchType, searchValue)
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    async function loadMeals() {
      setLoading(true);
      setError('');
      try {
        // Fetch meals based on the search parameters received from Search.js
        const mealList = await fetchMeals(state.searchType, state.searchValue);
        if (!mealList.length) {
          setError('No meals found.');
        }
        setMeals(mealList);
      } catch (err) {
        setError('There was an error loading the meals.');
      }
      setLoading(false);
    }

    loadMeals();
  }, [state.searchType, state.searchValue]); // Re-run when searchType or searchValue changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate('/') }>Search</button>
      <h1>Meal Recipes</h1>

      {error && <p>{error}</p>}

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Meal ID</th>
            <th>Meal Name</th>
            <th>Category</th>
            <th>Area</th>
            <th>Instructions</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.idMeal}>
              <td>{meal.idMeal}</td>
              <td>{meal.strMeal}</td>
              <td>{meal.strCategory}</td>
              <td>{meal.strArea}</td>
              <td>{meal.strInstructions}</td>
              <td>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Meals;
