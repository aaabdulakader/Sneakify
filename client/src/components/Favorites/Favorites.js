import React from "react";
import { Product } from "./../index.js";

import styles from "./Favorites.module.css";

function Favorites() {
  return (
    <div>
      <div className={styles.content}>
        <h1>Favorites</h1>
        <p>Here are your favorite items.</p>
      </div>
    </div>
  );
}

export default Favorites;
