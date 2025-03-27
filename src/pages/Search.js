import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/main.css';

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const Search = () => {
  const [searchType, setSearchType] = useState('search');
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [savedMeals, setSavedMeals] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedMeals')) || [];
    setSavedMeals(saved);
  }, []);

  const navigate = useNavigate();

  const handleSearchTypeChange = (e) => {
    const newType = e.target.value;
    setSearchType(newType);
    setSearchValue('');
    setOptions([]);

    switch (newType) {
      case 'search':
      case 'letter':
        setShowInput(true);
        break;
      case 'filter':
        setShowInput(false);
        setOptions(["Chicken", "Beef", "Lettuce", "Tomato", "Cheese"]);
        break;
      case 'category':
        setShowInput(false);
        setOptions([
          "Beef", "Chicken", "Dessert", "Lamb", "Miscellaneous",
          "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian", "Breakfast", "Goat"
        ]);
        break;
      case 'area':
        setShowInput(false);
        setOptions([
          "American", "British", "Canadian", "Chinese", "Croatian", "Dutch", "Egyptian", "Filipino",
          "French", "Greek", "Indian", "Irish", "Italian", "Jamaican", "Japanese", "Kenyan",
          "Malaysian", "Mexican", "Moroccan", "Polish", "Portuguese", "Russian", "Spanish",
          "Thai", "Tunisian", "Turkish", "Ukrainian", "Uruguayan", "Vietnamese"
        ]);
        break;
      default:
        break;
    }
  };

  const handleSearchSubmit = () => {
    if (searchType === 'random') {
      fetchRandomMeal();
    } else if (searchValue) {
      navigate('/meals', { state: { searchType, searchValue } });
    } else {
      alert("Please select or enter a value.");
    }
  };

  const fetchRandomMeal = async () => {
    try {
      const response = await fetch(`${API_URL}random.php`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        const randomMeal = data.meals[0];
        navigate('/saved', { state: { meal: randomMeal } }); // Navigate to SavedRecipes with meal details
      }
    } catch (error) {
      console.error("Error fetching random meal:", error);
      alert("Failed to fetch a random meal. Try again.");
    }
  };

  return (
    <div className='main'>
      <div className='btn-container'>
        <button className='btn' onClick={() => navigate('/')}>🏠 Home</button>
        <button className='btn mx-3' onClick={() => navigate('/saved')}>💾 Saved Meals</button>
      </div>
      <div className='row-container'>
        <div className='meal-view card col-md-11'>
          <h2>Search Meals</h2>
          <div>
            {/* Select search type */}
            <label className='my-5'><strong>Search Type: </strong></label>
            <select className='mx-3' value={searchType} onChange={handleSearchTypeChange}>
              <option value="search">Search by Name</option>
              <option value="letter">Search by First Letter</option>
              <option value="filter">Filter by Ingredient</option>
              <option value="category">Filter by Category</option>
              <option value="area">Filter by Area</option>
            </select>
            {/* Input or option list */}
            {showInput ? (
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Type your search..."
              />
            ) : (
              <select
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              >
                <option value="">-- Select an option --</option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            )}
            <div className='row'>
              <div className='col-6'>
                {/* Search & Random Buttons */}
                <button
                  onClick={handleSearchSubmit}
                  className='search-btn'
                >
                  🔍 Search
                </button>
              </div>
              <div className='d-flex justify-content-end col-6'>
                <button
                  onClick={fetchRandomMeal} // Now calls the function
                  className='random-btn'
                >
                  🎲 Random Meal
                </button>
              </div>

            </div>
          </div>
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

export default Search;
