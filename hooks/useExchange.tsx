import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRate } from "@/app/api/fetchExchange";



export const useExchangeRate = () => {
    return useQuery({
      queryKey: ["exchangeRate"],
      queryFn: fetchExchangeRate,
      staleTime: 60 * 60 * 1000, 
      retry: 2, 
    });
  };
