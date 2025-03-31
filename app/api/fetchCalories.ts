export const fetchCalories = async (ingredients: string[]) => {
    const CALORIENINJA_URL = "https://api.calorieninjas.com/v1/nutrition";
    const API_KEY = process.env.NEXT_PUBLIC_CALORIESNINJA_API_KEY;
  
    const uniqueIngredients = [...new Set(ingredients)];
    const queryString = uniqueIngredients.join(", ").slice(0, 1500).trim();
  
    if (!queryString) return {};
  
    try {
      const response = await fetch(`${CALORIENINJA_URL}?query=${queryString}`, {
        headers: { "X-Api-Key": API_KEY || "" },
      });
  
      if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  
      const data = await response.json();
  
      return data.items.reduce((acc: Record<string, number>, item: any) => {
        acc[item.name.toLowerCase()] = item.calories;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error fetching calories:", error);
      return {};
    }
  };
  