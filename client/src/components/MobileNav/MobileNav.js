import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import styles from "./MobileNav.module.css";

function MobileNav({ onClose, isMobileMenuOpen, logout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  }, []);

  const handleLogout = async () => {
    const logOutLink = "http://localhost:9000/logout";

    await fetch(logOutLink, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      jwt: localStorage.getItem("token"),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          logout();
        } else {
          alert("Error logging out");
        }
      });
  };

  return (
    <nav className={styles.mobileNav} area-label="Mobile Navigation">
      <ul className={styles.mobileNavList} onClick={onClose}>
        <li>
          <Link className={styles.mobileNavLink} to="/" area-label="Home">
            Home
          </Link>
        </li>
        <li>
          <Link className={styles.mobileNavLink} to="/men" aria-label="men">
            Men
          </Link>
        </li>
        <li>
          <Link className={styles.mobileNavLink} to="/women" area-label="Women">
            Women
          </Link>
        </li>
        <li>
          <Link className={styles.mobileNavLink} to="/kids" area-label="Kids">
            Kids
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileNavLink}
            to="/products"
            area-label="Products"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileNavLink}
            to="/contact"
            area-label="Contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileNavLink}
            to={isLoggedIn ? "/account" : "/login"}
            area-label="Login"
          >
            {isLoggedIn ? "My Account" : "Login"}
          </Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link
              className={styles.mobileNavLink}
              to="/"
              area-label="Logout"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MobileNav;
