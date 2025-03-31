"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import {  useRecipes } from "@/hooks/useRecipes";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import RecipeModal from "@/components/RecipeModal";
import Card from "@/components/Card";
import loadingAnimation from "@/public/lottie/loading.json";
import { Recipe } from "@/constants";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const { data: recipes, isLoading, isError } = useRecipes(debouncedSearchTerm);

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center">Find recipes you want</h1>
      <div className=" flex h-[52px] flex-1 items-center justify-center gap-3 rounded-full px-4 shadow-drop-3 !important">
        <Image src="/search.svg" alt="Search" width={24} height={24} />
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="p-2 border rounded-md w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[20vh]">
          <Lottie animationData={loadingAnimation} className="w-20 h-20" />
          <p className="text-gray-500 text-lg mt-2">Fetching recipes...</p>
        </div>
      )}
      {isError && (
        <p className="text-center text-red-500">Error fetching recipes.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto mt-3">
        {recipes?.map((recipe) => (
          <Card
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            details={[
              { label: "Calories", value: `${recipe.calories}Kcal` || "N/A" },
              { label: "Cost", value: recipe.costInNaira },
            ]}
            popoverContent={<p>Additional recipe information here</p>}
            onClick={() => setSelectedRecipe(recipe)}
            actionText="View full recipe"
          />
        ))}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}

        
      </div>
    </div>
  );
};

export default page;
