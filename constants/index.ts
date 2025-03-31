export const restaurantCovers = [
   "/restaurant1.jpg",
   "/restaurant2.jpg",
   "/restaurant3.jpg",
   "/restaurant4.jpg",
   "/restaurant5.jpg",
   "/restaurant6.jpg",
  ];

  export interface Recipe {
    id: number;
    title: string;
    image: string;
    category: string;
    instructions: string;
    costInNaira: number;
    calories: number | "N/A";
    ingredients: string[];
    ingredientCalories: { name: string; calories: number }[];
  }