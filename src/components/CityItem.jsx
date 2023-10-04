import styles from "./CityItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import FlagEmoji from "./FlagEmoji";


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const navigate = useNavigate()
  const { currentCity , handleDeleteCity} = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e){
    e.preventDefault()
    handleDeleteCity(id)
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}><FlagEmoji>{emoji}</FlagEmoji></span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
