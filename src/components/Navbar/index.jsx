import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo/brand.png";
import hamburg from "../../assets/icons/icons8-menu.svg";

import { useAuth } from "../../hooks/useAuth";

import "./navbar.css";

const Navbar = () => {
  const { user, isSignedIn, signOut } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const userName = useMemo(() => {
    if (!user) return "";
    return user.displayName?.length
      ? user.displayName
      : user.email?.split("@")[0];
  }, [user]);

  return (
    <>
      <div className="navbar">
        <div className="navbar__container">
          {/* logo */}
          <NavLink to="/">
            <div className="nav__logo">
              <h1 className="lead">Groot</h1>
              <img src={logo} alt="brand logo" />
              <h1 className="trail">Photo</h1>
            </div>
          </NavLink>
          {/* right menu */}
          <div className="nav__menu">
            <ul>
              {isSignedIn ? (
                <li>
                  <button onClick={() => signOut()}>Sign Out</button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* mobile */}
        <div className="mobile__navigation">
          <div className="nav__trigger">
            <img
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              width={40}
              src={hamburg}
              alt="mobile nav menu trigger"
            />
          </div>
          <div className={`nav__panel ${mobileNavOpen ? "view" : ""}`}>
            <ul>
              {isSignedIn ? (
                <li>
                  <button onClick={() => signOut()}>Sign Out</button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
