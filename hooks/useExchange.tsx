import { useQuery } from "react-query";
import { fetchExchangeRate } from "@/app/api/fetchExchange";


export const useExchangeRate = () => {
  return useQuery<number>("exchangeRate", fetchExchangeRate, {
    staleTime: 60 * 60 * 1000, 
    cacheTime: 2 * 60 * 60 * 1000, 
    retry: 2,
  });
};
