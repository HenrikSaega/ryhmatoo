const API_URL = "https://www.themealdb.com/api/json/v1/1/";
// www.themealdb.com/api/json/v1/1/search.php?s={toidu_nimi}

export const fetchMeals = async (searchType, searchValue) => {
  try {
    let apiUrl = "";

    switch (searchType) {
      case 'search':
        apiUrl = `${API_URL}search.php?s=${searchValue}`;
        break;
      case 'letter':
        apiUrl = `${API_URL}search.php?f=${searchValue}`;
        break;
      case 'random':
        apiUrl = `${API_URL}random.php`;
        break;
      case 'filter': // ingredient
        apiUrl = `${API_URL}filter.php?i=${searchValue}`;
        break;
      case 'category':
        apiUrl = `${API_URL}filter.php?c=${searchValue}`;
        break;
      case 'area':
        apiUrl = `${API_URL}filter.php?a=${searchValue}`;
        break;
      default:
        throw new Error('Invalid search type');
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    // For filter, category, area — fetch full details for each meal
    if (['filter', 'category', 'area'].includes(searchType) && data.meals) {
      const fullMeals = await Promise.all(
        data.meals.map(async (meal) => {
          const res = await fetch(`${API_URL}lookup.php?i=${meal.idMeal}`);
          const detailData = await res.json();
          return detailData.meals[0];
        })
      );
      return fullMeals;
    }

    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
};


