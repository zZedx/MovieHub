import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

const URL = "http://localhost:3001";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "citiesLoaded":
      return { ...state, cities: action.payload };
    case "setLoadingTrue":
      return { ...state, isLoading: true };
    case "setLoadingFalse":
      return { ...state, isLoading: false };
    case "currentCity":
      return { ...state, currentCity: action.payload };
    case "addCity":
      return {
        ...state,
        cities: [action.payload, ...state.cities],
        currentCity: action.payload,
      };
    case "deleteCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "setLoadingTrue" });
      try {
        const response = await fetch(URL + "/cities");
        const data = await response.json();
        dispatch({ type: "citiesLoaded", payload: data.reverse() });
      } catch (error) {
        console.log("There was an Error fetching the data...");
      } finally {
        dispatch({ type: "setLoadingFalse" });
      }
    }
    fetchCities();
  }, []);

  async function getCurrentCity(id) {
    if(Number(id) === currentCity.id) return
    dispatch({ type: "setLoadingTrue" });
    try {
      const response = await fetch(`${URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "currentCity", payload: data });
    } catch (error) {
      alert("There was an Error fetching the data...");
    } finally {
      dispatch({ type: "setLoadingFalse" });
    }
  }

  async function handleAddCity(city) {
    dispatch({ type: "setLoadingTrue" });
    try {
      const response = await fetch(URL + "/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await response.json();
      dispatch({ type: "addCity", payload: data });
    } catch (error) {
      alery("There was an Error adding the city");
    } finally {
      dispatch({ type: "setLoadingFalse" });
    }
  }

  async function handleDeleteCity(id) {
    dispatch({ type: "setLoadingTrue" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "deleteCity", payload: id });
    } catch (error) {
      alert("There was an Error deleting the city");
    } finally {
      dispatch({ type: "setLoadingFalse" });
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
