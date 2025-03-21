// Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchType, setSearchType] = useState('search'); // Default to 'search' for name-based search
  const [searchValue, setSearchValue] = useState('A'); // Default value (can be letter, name, etc.)
  const [options, setOptions] = useState([]);
  
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to handle search type changes
  const handleSearchTypeChange = (newType) => {
    setSearchType(newType);
    
    // Set random names for different search types
    switch (newType) {
      case 'search':
        setOptions(["Pizza", "Burger", "Pasta", "Tacos", "Sushi"]);
        break;
      case 'filter-i':
        setOptions(["Chicken", "Beef", "Lettuce", "Tomato", "Cheese"]);
        break;
      case 'filter-c':
        setOptions(["Italian", "Chinese", "Mexican", "Indian", "American"]);
        break;
      case 'filter-a':
        setOptions(["Asia", "Europe", "Africa", "America", "Australia"]);
        break;
      case 'letter':
        setOptions(["A", "B", "C", "D", "E"]);
        break;
      case 'random':
        setOptions(["Random Meal 1", "Random Meal 2", "Random Meal 3"]);
        break;
      default:
        setOptions([]);
    }
  };

  // Function to navigate to Meals.js and pass the selected search parameters
  const handleSearchSelect = (value) => {
    setSearchValue(value);
    navigate('/meals', { state: { searchType, searchValue: value } });
  };

  return (
    <div>
        <div>
        <button onClick={() => navigate('/') }>Go back/Home</button>
        <button onClick={() => navigate('/') }>Saved recipes</button>
        </div>
        
      <h1>Meal Recipes</h1>

      {/* Buttons to select search type */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleSearchTypeChange('search')}>Search by Name</button>
        <button onClick={() => handleSearchTypeChange('filter-i')}>Filter by Ingredient</button>
        <button onClick={() => handleSearchTypeChange('filter-c')}>Filter by Category</button>
        <button onClick={() => handleSearchTypeChange('filter-a')}>Filter by Area</button>
        <button onClick={() => handleSearchTypeChange('letter')}>Search by First Letter</button>
        <button onClick={() => handleSearchTypeChange('random')}>Random Meal</button>
      </div>

      {/* Display the list of options for the selected search type */}
      {options.length > 0 && (
        <div>
          <h3>Select a {searchType === 'search' ? 'meal name' : 'search value'}</h3>
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <button 
                  onClick={() => handleSearchSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Search;
