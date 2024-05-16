import { React, useEffect, useState } from "react";
import { Product } from "./../index.js";

import styles from "./Favorites.module.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  // get user favorites
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const link = `http://localhost:9000/users/${user._id}`;

  useEffect(() => {
    const getFavorites = async () => {
      if (!user) return;
      const response = await fetch(link);
      const data = await response.json();
      setFavorites(data.documents.favorites);
    };
    getFavorites();
  }, []);

  return (
    <div>
      <div className={styles.content}>
        <h1>Favorites</h1>
      </div>
    </div>
  );
}

export default Favorites;
