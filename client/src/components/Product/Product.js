import React from "react";

import styles from "./Product.module.css";

function Product({ product }) {
  const handleProductClick = (productSlug) => {
    product.image = `https://picsum.photos/200?random=${
      Math.floor(Math.random() * 100) + 100
    }`;

    localStorage.setItem("currentProduct", JSON.stringify(product));
    // Redirect to product details page
    window.location.href = `/products/${productSlug}`;

    console.log("Product clicked" + productSlug);
  };

  // 100 to 200
  const randomImage = Math.floor(Math.random() * 100) + 100;
  const image = `https://picsum.photos/200?random=${randomImage}`;
  // Prduct component, to be used in ProductList component. should display a product card with an image, title, price, and a button to add to cart.
  return (
    <div className={styles.product} key={product._id}>
      {/* product card */}
      {/* <div className={styles.productCard + " scale_up_center"}> */}
      <div
        className={styles.productCard + " scale_up_center"}
        onClick={() => handleProductClick(product.slug)}
      >
        <div className={styles.imgContainer}>
          {/* <img src={require("./image-0.png")} alt="product" /> */}
          <img src={product.images[0]} alt="product" loading="lazy" />
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
