// Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchType, setSearchType] = useState('search'); // Default to 'search' for name-based search
  const [searchValue, setSearchValue] = useState('A'); // Default value (can be letter, name, etc.)
  const [options, setOptions] = useState([]);
  const [showInput,setShowInput] = useState(false)

  const navigate = useNavigate(); // Hook to navigate between pages
  
  // Function to handle search type changes
  const handleSearchTypeChange = (newType) => {
    setSearchType(newType);

    // Set random names for different search types
    switch (newType) {
      case 'search': // Search by meal name
        setSearchType('search');
        setShowInput(true);  // Show input field
        setOptions([]);      // No predefined options
        break;
      case 'filter-i':// Filter ingridient
        setSearchType('filter')
        setShowInput(false);
        setOptions(["Chicken", "Beef", "Lettuce", "Tomato", "Cheese"]);
        break;
      case 'filter-c': // Seatch by catogry
        setSearchType('category');
        setShowInput(false);
        setOptions([
          "Beef", "Chicken", "Dessert", "Lamb", "Miscellaneous",
          "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian", "Breakfast", "Goat"
        ]);
        break;
        case 'filter-a':// Search by area
          setSearchType('area');
          setShowInput(false);
          setOptions([
            "American", "British", "Canadian", "Chinese", "Croatian", "Dutch", "Egyptian", "Filipino",
            "French", "Greek", "Indian", "Irish", "Italian", "Jamaican", "Japanese", "Kenyan",
            "Malaysian", "Mexican", "Moroccan", "Polish", "Portuguese", "Russian", "Spanish",
            "Thai", "Tunisian", "Turkish", "Ukrainian", "Uruguayan", "Vietnamese"
          ]);
          break;
      case 'letter':
        setSearchType('letter');
        setShowInput(true);  // Show input field
        setOptions([]);      // No predefined options
        break;
        case 'random':
          setSearchType('random');
          setShowInput(false);
          setOptions([]);
          navigate('/meals', { state: { searchType: 'random' } }); // Trigger right away
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
        <button onClick={() => navigate('/')}>Go back/Home</button>
        <button onClick={() => navigate('/saved')}>Saved recipes</button>
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
      {showInput ? (
  <div>
    <h3>Type your search</h3>
    <input
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Enter search term..."
    />
    <button onClick={() => handleSearchSelect(searchValue)}>Search</button>
  </div>
) : (
  options.length > 0 && (
    <div>
      <h3>Select a {searchType} option</h3>
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
  )
)}


    </div>
  );
};

export default Search;
