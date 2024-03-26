import React from "react";
import { AccountSidebar } from "./../index.js";

import favoritesStyles from "./Favorites.module.css";

function Favorites() {
  return (
    <div>
      <AccountSidebar />
      <div className={favoritesStyles.content}>
        <h1>Favorites</h1>
        <p>Here are your favorite items.</p>
      </div>
    </div>
  );
}

export default Favorites;
