import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import mobileNavStyles from "./MobileNav.module.css";

function MobileNav({ onClose }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  }, []);

  return (
    <nav className={mobileNavStyles.mobileNav} area-label="Mobile Navigation">
      <ul className={mobileNavStyles.mobileNavList} onClick={onClose}>
        <li>
          <Link
            className={mobileNavStyles.mobileNavLink}
            to="/"
            area-label="Home"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={mobileNavStyles.mobileNavLink}
            to="/men"
            aria-label="men"
          >
            Men
          </Link>
        </li>
        <li>
          <Link
            className={mobileNavStyles.mobileNavLink}
            to="/women"
            area-label="Women"
          >
            Women
          </Link>
        </li>
        <li>
          <Link
            className={mobileNavStyles.mobileNavLink}
            to="/kids"
            area-label="Kids"
          >
            Kids
          </Link>
        </li>
        <li>
          <Link
            className={mobileNavStyles.mobileNavLink}
            to="/products"
            area-label="Products"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            className={mobileNavStyles.mobileNavLink}
            to="/contact"
            area-label="Contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className={mobileNavStyles.mobileNavLink}
            to={isLoggedIn ? "/useraccount" : "/login"}
            area-label="Login"
          >
            {isLoggedIn ? "My Account" : "Login"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MobileNav;
