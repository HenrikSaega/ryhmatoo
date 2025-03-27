import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';


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

  const handleRemoveMeal = (idMeal) => {
    const updatedMeals = savedMeals.filter((meal) => meal.idMeal !== idMeal);
    setSavedMeals(updatedMeals);
    localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    savedMeals.forEach((meal, index) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients.push(`${meas?.trim() || ''} ${ing.trim()}`);
        }
      }

      doc.setFontSize(14);
      doc.text(`${index + 1}. ${meal.strMeal}`, 10, y);
      y += 8;
      doc.setFontSize(11);
      doc.text(`Category: ${meal.strCategory || ''}   |   Area: ${meal.strArea || ''}`, 10, y);
      y += 6;

      doc.setFontSize(10);
      doc.text('Ingredients:', 10, y);
      y += 6;

      ingredients.forEach((line) => {
        doc.text(`- ${line}`, 12, y);
        y += 5;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });

      doc.text('Instructions:', 10, y);
      y += 6;

      const instructions = doc.splitTextToSize(meal.strInstructions || '', 180);
      instructions.forEach((line) => {
        doc.text(line, 12, y);
        y += 5;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });

      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('saved_recipes.pdf');
  };

  return (
    <div className='main'>
      <div className='btn-container'>
        <button className='btn' onClick={() => navigate('/')}>🏠 Home</button>
        <button className='btn mx-3' onClick={() => navigate('/search')}>🔍 Search Meals</button>
      </div>
      {/* Main Content - Either Show Meal Details or Message */}
      <div className='row-container'>
        <div className='meal-view card col-md-11'>
          {meal ? (
            <>
              <div className='row'>
                <div className='col-7'>
                  <h2>{meal.strMeal}</h2>
                </div>
                <div className='col-5 text-end'>
                  {savedMeals.some((savedmeal) => savedmeal.idMeal === meal.idMeal) && (
                    <button
                      onClick={() => handleRemoveMeal(meal.idMeal)}
                      className='btn btn-delete'>
                      🗑️ Remove
                    </button>
                  )}
                  <button
                    onClick={downloadAsPDF}
                    className='btn mx-1'>
                    ⬇️ PDF
                  </button>
                  <button
                    onClick={handleSaveMeal}
                    className='btn'>
                    💾 Save Meal
                  </button>
                </div>
              </div>

              <div className='row'>
                <div className='col-6'>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className='meal-img img-fluid'
                  />
                  <p><strong>Category:</strong> {meal.strCategory}</p>
                  <p><strong>Area:</strong> {meal.strArea}</p>

                </div>
                <div className='col-6'>
                  <h4>Ingredients:</h4>
                  <ul>
                    {Array.from({ length: 20 }).map((_, i) => {
                      const ingredient = meal[`strIngredient${i + 1}`];
                      const measure = meal[`strMeasure${i + 1}`];
                      return ingredient ? <li key={i}>{measure} {ingredient}</li> : null;
                    })}
                  </ul>
                </div>
              </div>

              <h4>Instructions:</h4>
              <p>{meal.strInstructions}</p>

            </>
          ) : (
            <h2>Select a saved meal from the list.</h2>
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

export default SavedRecipes;
