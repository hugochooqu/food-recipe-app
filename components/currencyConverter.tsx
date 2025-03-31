"use client";

import { useExchangeRate } from "@/hooks/useExchange";

interface CurrencyPopupProps {
  costInNaira: number;
  
}

const CurrencyConverter: React.FC<CurrencyPopupProps> = ({ costInNaira }) => {
  const { data: exchangeRate, isLoading } = useExchangeRate();
  const costInUSD = exchangeRate ? (Number(costInNaira) * exchangeRate).toFixed(2) : "N/A";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            <strong>${costInUSD} USD</strong>
          </p>
        )}
      
      
    </div>
  );
};

export default CurrencyConverter;
