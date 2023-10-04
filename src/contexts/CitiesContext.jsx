import { createContext, useState, useEffect, useContext } from "react";

const URL = "http://localhost:3001";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const response = await fetch(URL + "/cities");
        const data = await response.json();
        setCities(data.reverse());
      } catch (error) {
        console.log("There was an Error fetching the data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCurrentCity(id) {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert("There was an Error fetching the data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddCity(city) {
    setIsLoading(true);
    try {
      const response = await fetch(URL + "/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await response.json();
      setCities((cities) => [data, ...cities]);
    } catch (error) {
      alery("There was an Error adding the city");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteCity(id) {
    setIsLoading(true);
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities(cities=> cities.filter(city=>city.id !== id))
    } catch (error) {
      alert("There was an Error deleting the city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        handleAddCity,
        handleDeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the cities provider");
  return context;
}

export { CitiesProvider, useCities };
