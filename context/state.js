import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    const fetchEthPrice = async () => {
      const result = await fetch("/api/eth-price")
      console.log("went to fetch eth price")
      const { ethPrice } = await result.json()
      setEthPrice(ethPrice)
    }
    fetchEthPrice()
  }, [])

  return (
    <AppContext.Provider value={{ ethPrice }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}