// Search.js
import React, { useState, useEffect } from 'react';
import { fetchMeals } from '../service/Api'; // Make sure fetchMeals is modified as per the dynamic search
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for dynamic search
  const [searchType, setSearchType] = useState(''); // Default to 'search' for name-based search
  const [searchValue, setSearchValue] = useState(''); // Default value (can be letter, name, etc.)
  
  const navigate = useNavigate(); // Hook to navigate between pages

  // Fetch meals based on the selected search parameters
  useEffect(() => {
    async function loadMeals() {
      setLoading(true);
      setError('');
      try {
        // Fetch meals using the dynamic search type and value
        const mealList = await fetchMeals(searchType, searchValue);
        if (!mealList.length) {
          setError('No meals found for this search.');
        }
        setMeals(mealList);
      } catch (err) {
        setError('There was an error loading the meals.');
      }
      setLoading(false);
    }

    loadMeals();
  }, [searchType, searchValue]); // Re-run when searchType or searchValue changes

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleViewMeals = () => {
    // Passing meals data to the Meals component
    navigate('/meals', { state: { meals } });
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Meal Recipes</h1>

      {/* Dropdown for selecting search type */}
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="search">Search by Name</option>
        <option value="filter-i">Filter by Ingredient</option>
        <option value="filter-c">Filter by Category</option>
        <option value="filter-a">Filter by Area</option>
        <option value="letter">Search by First Letter</option>
        <option value="random">Random Meal</option>
      </select>

      {/* Input for entering the search value */}
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchValueChange}
        placeholder={`Enter ${searchType === 'search' ? 'meal name' : (searchType === 'letter' ? 'letter' : 'search value')}`}
      />

      {error && <p>{error}</p>}

     

      {/* Button to go to the MealsPage and pass the meals data */}
      <button onClick={handleViewMeals}>View Meals</button>
    </div>
  );
};

export default Search;
