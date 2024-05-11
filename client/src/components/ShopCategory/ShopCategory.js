import React from "react";
import { Link } from "react-router-dom";

import styles from "./ShopCategory.module.css";

function ShopCategory() {
  return (
    <section className={styles.shopCategories}>
      {/* <Link to="/men"> */}
      <div
        className={styles.shopCategory}
        onClick={() => (window.location.href = "/men")}
      >
        <h2 className={styles.shopCategoryTitle}>Shop Men</h2>
      </div>
      {/* </Link> */}
      <div
        className={styles.shopCategory}
        onClick={() => (window.location.href = "/women")}
      >
        <h2 className={styles.shopCategoryTitle}>Women</h2>
      </div>
      <div
        className={styles.shopCategory}
        onClick={() => (window.location.href = "/kids")}
      >
        <h2 className={styles.shopCategoryTitle}>Kids</h2>
      </div>
    </section>
  );
}

export default ShopCategory;
