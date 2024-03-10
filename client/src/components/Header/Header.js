import { React, useRef, useState } from "react";

import headerStyles from "./Header.module.css";

// icons
import { BsCart3 } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { Link } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

function Header() {
  // States
  //   const [products, setProducts] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div>
      <header className={headerStyles.header + " container"}>
        {/* Logo */}
        <Link to="/">
          <GiRunningShoe className={headerStyles.logo} />
        </Link>
        <nav className={headerStyles.nav + " mobileMenu"}>
          <ul className={headerStyles.navList}>
            <li>
              <Link className={headerStyles.navLink} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={headerStyles.navLink} to="/men">
                Men
              </Link>
            </li>
            <li>
              <Link className={headerStyles.navLink} to="/women"></Link>
            </li>
            <li>
              <Link className={headerStyles.navLink} to="/kids">
                Kids
              </Link>
            </li>
            <li>
              <Link className={headerStyles.navLink} to="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className={headerStyles.navLink} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        {/* Login link or Profile Icon */}
        <div className={headerStyles.rightNav}>
          {isLoggedIn ? (
            <Link to="/profile">
              <RiAccountCircleLine className={headerStyles.profileIcon} />
            </Link>
          ) : (
            <Link className={headerStyles.navLink} to="/login">
              Login
            </Link>
          )}

          <Link className={headerStyles.cartIcon} to="/cart">
            <BsCart3 className={headerStyles.cartLogo} />
          </Link>

          {isMobileMenuOpen ? (
            <IoCloseOutline
              onClick={() => setIsMobileMenuOpen(false)}
              className={headerStyles.menuIcon}
            />
          ) : (
            <IoMenuOutline
              onClick={() => setIsMobileMenuOpen(true)}
              className={headerStyles.menuIcon}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
