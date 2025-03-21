const API_URL = "https://www.themealdb.com/api/json/v1/1/";
// www.themealdb.com/api/json/v1/1/search.php?s={toidu_nimi}

export const fetchMeals = async (searchType, searchValue) => {
  try {
    // Dynamically build the API URL based on search type
    let apiUrl = "";

    // Define different types of search based on the provided searchType
    switch (searchType) {
      case 'search':  // Search by name
        apiUrl = `${API_URL}search.php?s=${searchValue}`;
        break;
      case 'filter': // Filter by ingredient
        apiUrl = `${API_URL}filter.php?i=${searchValue}`;
        break;
      case 'category': // Filter by category
        apiUrl = `${API_URL}filter.php?c=${searchValue}`;
        break;
      case 'area': // Filter by area (region)
        apiUrl = `${API_URL}filter.php?a=${searchValue}`;
        break;
      case 'letter': // Search by first letter
        apiUrl = `${API_URL}search.php?f=${searchValue}`;
        break;
      case 'random': // Random meal
        apiUrl = `${API_URL}random.php`;
        break;
      default:
        throw new Error('Invalid search type');
    }

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.meals) {
      return data.meals;
    } else {
      return []; // No meals found
    }
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
};

