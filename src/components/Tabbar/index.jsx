import { NavLink } from "react-router-dom";

import "./styles.css";

const Tabbar = () => {
  return (
    <div className="safe">
      <div className="tabbar">
        <ul>
          <li>
            <NavLink to="/admin/photographers" end={false}>
              Photographers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/requests" end={false}>
              Requests
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tabbar;
