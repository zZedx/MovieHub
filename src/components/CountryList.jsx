import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

const CountriesList = () => {
  const {cities , isLoading} = useCities()
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (!cities.length) {
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      ></Message>
    );
  }

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((country) => country.country).includes(city.country))
      return [
        ...acc,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountriesList;
