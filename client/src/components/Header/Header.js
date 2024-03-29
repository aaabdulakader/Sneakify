import { React, useRef, useState, useEffect } from "react";

import headerStyles from "./Header.module.css";
import { MobileNav } from "../index.js";

// icons
import { BsCart3 } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { Link } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

function Header({ logout }) {
  // States
  //   const [products, setProducts] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // const checklogin = () =>
  useEffect(() => {
    // check the presence of a cookie named jwt
    const token = document.cookie;
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  }, []);

  const handleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // console.log(isLoggedIn);
  return (
    <header className={headerStyles.header + " container"}>
      {/* Logo */}
      <Link to="/" area-label="Home">
        <GiRunningShoe className={headerStyles.logo} />
      </Link>
      <nav className={headerStyles.nav + " mobileMenu"} area-label="Navigation">
        <ul className={headerStyles.navList}>
          <li>
            <Link className={headerStyles.navLink} to="/" area-label="Home">
              Home
            </Link>
          </li>
          <li>
            <Link className={headerStyles.navLink} to="/men" area-label="Men">
              Men
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navLink}
              to="/women"
              area-label="Women"
            >
              Women
            </Link>
          </li>
          <li>
            <Link className={headerStyles.navLink} to="/kids" area-label="Kids">
              Kids
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navLink}
              to="/products"
              area-label="Products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navLink}
              to="/contact"
              area-label="Contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      {/* Login link or Profile Icon */}
      <div className={headerStyles.rightNav} area-label="Right Navigation">
        {/* Search */}
        <div className={headerStyles.search}>
          <input
            type="text"
            placeholder="Search"
            className={headerStyles.searchInput}
            id="search"
          />
          {/* <IoIosSearch className={headerStyles.searchIcon} /> */}
        </div>
        {isLoggedIn ? (
          <Link to="/account" area-label="Profile">
            <RiAccountCircleLine
              className={headerStyles.profileIcon}
              onMouseEnter={toggleMobileMenu}
            />
          </Link>
        ) : (
          <Link className={headerStyles.navLink} to="/login">
            Login
          </Link>
        )}

        <Link className={headerStyles.cartIcon} to="/cart" area-label="Cart">
          <BsCart3 className={headerStyles.cartLogo} />
        </Link>

        {isMobileMenuOpen ? (
          <IoCloseOutline
            onClick={toggleMobileMenu}
            className={headerStyles.menuIconClose}
          />
        ) : (
          <IoMenuOutline
            onClick={toggleMobileMenu}
            className={headerStyles.menuIcon}
          />
        )}

        {/* Mobile nav */}
        {
          // if mobile menu is open, show mobile nav
          isMobileMenuOpen && (
            <MobileNav
              onClose={toggleMobileMenu}
              active={isMobileMenuOpen}
              logout={logout}
            />
          )
        }
      </div>
    </header>
  );
}

export default Header;
