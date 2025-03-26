import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/SavedRecipes.css';

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const Search = () => {
  const [searchType, setSearchType] = useState('search');
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState([]);
  const [showInput, setShowInput] = useState(true);

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
        <button className='btn mx-3' onClick={() => navigate('/saved')}>Saved recipes</button>
      </div>

      <h1>Meal Recipes</h1>

      {/* Select search type */}
      <div style={{ margin: '20px 0' }}>
        <label><strong>Search Type: </strong></label>
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="search">Search by Name</option>
          <option value="letter">Search by First Letter</option>
          <option value="filter">Filter by Ingredient</option>
          <option value="category">Filter by Category</option>
          <option value="area">Filter by Area</option>
        </select>
      </div>

      {/* Input or option list */}
      <div style={{ marginBottom: '20px' }}>
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
      </div>

      {/* Search & Random Buttons */}
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={handleSearchSubmit}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            marginRight: '20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Search
        </button>

        <button
          onClick={fetchRandomMeal} // Now calls the function
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Random Meal
        </button>
      </div>
    </div>
  );
};

export default Search;
