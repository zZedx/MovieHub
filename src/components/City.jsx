import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useLayoutEffect} from "react";
import { useCities } from "../contexts/CitiesContext";
import styles from "./City.module.css";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function City() {
  const { id } = useParams();
  const { currentCity, getCurrentCity , isLoading} = useCities();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    function fetchCity() {
      getCurrentCity(id);
    }
    fetchCity();
  }, [id]);

const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{cityName}</h6>
        <h3>
          <span>{emoji ? flagemojiToPNG(emoji) : ""}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
