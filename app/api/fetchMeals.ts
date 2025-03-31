export const fetchMeals = async (query: string) => {
    const MEALDB_URL = "https://www.themealdb.com/api/json/v1/1/search.php";
  
    try {
      const response = await fetch(`${MEALDB_URL}?s=${query}`);
  
      if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  
      const data = await response.json();
      if (!data.meals) return [];
  
      return data.meals.map((meal: any) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        instructions: meal.strInstructions,
        ingredients: Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`]).filter(Boolean),
        costInNaira: Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000, // Random cost
      }));
    } catch (error) {
      console.error("Error fetching meals:", error);
      return [];
    }
  };
  