import { NavLink } from "react-router-dom";
import { LANGUAGES } from "../../constants";
const isActive = ({ isActive }: any) => `link ${isActive ? "active" : ""}`;

export const Menu = () => {
  return (
    <nav>
      <div>
        <NavLink className={isActive} to="/">
          Home
        </NavLink>
        <NavLink className={isActive} to="/about">
          About
        </NavLink>
      </div>

      <select defaultValue={"es"}>
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </nav>
  );
};