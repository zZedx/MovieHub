import styles from "./CountryItem.module.css";
import FlagEmoji from "./FlagEmoji";

function CountryItem({ country }) {
  const { emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span><FlagEmoji>{emoji}</FlagEmoji></span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
