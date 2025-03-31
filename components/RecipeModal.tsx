'use client'

import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,

  } from "@/components/ui/alert-dialog"
import { RecipeModalProps } from "@/constants";
  



const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);
  if (!recipe) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="space-y-4 max-w-[155%] sm:w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10 bg-white outline-none max-h-[90vh] scrollbar-hidden overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={onClose}
      >
        ✖
      </button>

      <h2 className="text-xl font-bold">{recipe.title}</h2>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover my-3 rounded"
      />

      <p>
        <strong>Category:</strong> {recipe.category}
      </p>
      <p>
        <strong>Cost:</strong> ₦{recipe.costInNaira}
      </p>

      <h3 className="mt-3 font-semibold">Ingredients & Calories:</h3>
      <ul className="bg-gray-100 p-2 rounded">
        {recipe.ingredientCalories.map((ingredient, index) => (
          <li key={index} className="flex justify-between py-1 border-b">
            <span>{ingredient.name}</span>
            <span>{ingredient.calories} kcal</span>
          </li>
        ))}
      </ul>

      <p className="mt-3">
        <strong>Total Calories:</strong> {recipe.calories} kcal
      </p>

      <h3 className="mt-3 font-semibold">Instructions:</h3>
      <p className="text-gray-700">{recipe.instructions}</p>

      <button
        onClick={onClose}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Close
      </button></AlertDialogContent>
    </AlertDialog>

   

  );
};

export default RecipeModal;
