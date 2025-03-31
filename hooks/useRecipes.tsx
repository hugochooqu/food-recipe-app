"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "@/app/api/fetchMeals";
import { fetchCalories } from "@/app/api/fetchCalories";
import { Recipe } from "@/constants";



const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const meals = await fetchMeals(query);
    if (meals.length === 0) return [];

    const allIngredients = meals.flatMap((meal: any) => meal.ingredients);
    const calorieData = await fetchCalories(allIngredients);

    return meals.map((meal : any) => ({
      ...meal,
      ingredientCalories: meal.ingredients.map((ingredient : string) => ({
        name: ingredient,
        calories: calorieData[ingredient.toLowerCase()] || 0,
      })),
      calories: meal.ingredients.reduce(
        (sum : number, ingredient : string) => sum + (calorieData[ingredient.toLowerCase()] || 0),
        0
      ),
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const useRecipes = (query: string) => {
  return useQuery({
    queryKey: ["recipes", query],
    queryFn: () => fetchRecipes(query),
    enabled: Boolean(query), 
  });
};
