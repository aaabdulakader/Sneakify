// Account.jsx
import React, { useState } from "react";
// import AccountSidebar from "./AccountSidebar";
import { AccountSidebar, Favorites, Orders, UserInfo } from "./../index.js";
import styles from "./Account.module.css";
import { Routes, Route, Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/account/userinfo">User Info</Link>
        </li>
        <li>
          <Link to="/account/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/account/orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

// Main content component
// const MainContent = () => {
//   return (
//     <div className="main-content">
//       <Outlet />
//     </div>
//   );
// };

// const Account = () => {
//   // State to track the currently selected tab
//   const [selectedTab, setSelectedTab] = useState("userInfo");

//   return (
//     <div className="page-container">
//       <Sidebar />
//       <MainContent />
//     </div>
//   );
// };

const AccountPage = () => {
  return (
    <div className={styles.accountPage}>
      <AccountSidebar />
      <Routes>
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default Sidebar;
