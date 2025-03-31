import { restaurantCovers } from "@/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomRestaurantCover = () => {
  const randomIndex = Math.floor(Math.random() * restaurantCovers.length);
  return `${restaurantCovers[randomIndex]}`;
};