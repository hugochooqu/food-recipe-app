export const fetchExchangeRate = async (): Promise<number> => {

const EXCHANGE_RATE_API = "https://v6.exchangerate-api.com/v6/4a4761d9750e7f039ae35785/latest/NGN";
    try {
      const response = await fetch(EXCHANGE_RATE_API);

      if (!response.ok) throw new Error (`API request failed: ${response.status} ${response.statusText}`)

      const data = await response.json()

      return data.conversion_rates?.USD; 
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return 0; 
    }
  };