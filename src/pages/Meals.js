// Meals.js
import React from 'react';
import {useLocation, useNavigate } from 'react-router-dom';

const Meals = () => {
  const location = useLocation();
  const meals = location.state ? location.state.meals : [];
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/') }>Search</button>
      <h1>Meal Details</h1>
      
      {meals.length === 0 ? (
        <p>No meals to display</p>
      ) : (
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
      )}
    </div>
  );
};

export default Meals;
