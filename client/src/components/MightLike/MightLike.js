import { React, useState, useEffect } from "react";

import { Product } from "../index";

import styles from "./MightLike.module.css";

function MightLike() {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const handleSuggestedProducts = async () => {
    const link = "http://localhost:9000/products/";
    try {
      const res = await fetch(link);
      const data = await res.json();
      setSuggestedProducts(data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSuggestedProducts();
  }, []);

  return (
    <div className={styles.mightLike}>
      <h2 className={styles.mightLikeTitle}>You might also like</h2>
      <div className={styles.mightLikeProducts}>
        {/* Top 3  ratedproducts */}
        {suggestedProducts
          .sort((a, b) => b.rating - a.rating)
          .map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default MightLike;
