import React from "react";

import styles from "./Product.module.css";

function Product({ product }) {
  // Prduct component, to be used in ProductList component. should display a product card with an image, title, price, and a button to add to cart.
  return (
    <div>
      <div className={styles.productCard + " scale_up_center"}>
        <div className={styles.imgContainer}>
          <img
            src={require("./image-0.png")}
            alt="Product"
            className={styles.productImage}
          />
        </div>
        {/* product info div */}

        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <p className={styles.productPrice}>{"$" + product.price}</p>
        </div>

        {/* <button className={styles.addToCartButton}>Add to Cart</button> */}
      </div>
    </div>
  );
}

export default Product;
