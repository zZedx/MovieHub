import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/AuthContext";

const PageNav = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to={isAuthenticated ? "/" : "/login"} className={style.ctaLink}>
            {isAuthenticated ? "Logout" : "login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
