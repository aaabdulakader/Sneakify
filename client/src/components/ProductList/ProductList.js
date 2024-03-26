import { React, useState, useEffect } from "react";
import { SortBy, Product } from "../index";
import { IoFilterOutline } from "react-icons/io5";

import styles from "./ProductList.module.css";
// import ProductList from "../../../../clientt/src/components/ProductList/ProductList";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const link = "http://localhost:9000/products/";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (limit) => {
    await fetch(link + (limit ? `?limit=${limit}` : ""))
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.documents);
      });
  };

  console.log(products);

  const handleShowMore = () => {
    // Fetch more products
    fetchProducts(products.length + 10);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div>
      {/* <SortBy /> */}

      {/* Filter By button */}
      <div className={styles.filterByContainer} onClick={handleFilter}>
        {<IoFilterOutline className={styles.filterByIcon} />}
        <button className={styles.filterByButton}>Filter</button>
      </div>
      <div className={styles.productList}>
        <div
          className={
            styles.filterOptions + " " + (showFilter ? styles.show : "")
          }
        >
          {/* 1. Gender Category dropdown */}
          <div className={styles.filterCategory}>
            {/* Category title */}
            <h3 className={styles.categoryTitle + " " + styles.filterTitle}>
              Category
            </h3>
            {/* Category options */}
            <div className={styles.categoryOptions}>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="men" name="men"></input>
                <label htmlFor="men">Men</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="women" name="women"></input>
                <label htmlFor="women">Women</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="kids" name="kids"></input>
                <label htmlFor="kids">Kids</label>
              </div>
            </div>
          </div>

          {/* 3.Shoe Size Category dropdown */}

          <div className={styles.filterCategory}>
            {/* Category title */}
            <h3 className={styles.categoryTitle + " " + styles.filterTitle}>
              Size
            </h3>
            {/* Category options */}
            <div className={styles.categoryOptions}>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="size-6" name="size-6"></input>
                <label htmlFor="size-6">6</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="size-7" name="size-7"></input>
                <label htmlFor="size-7">7</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="size-8" name="size-8"></input>
                <label htmlFor="size-8">8</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="size-9" name="size-9"></input>
                <label htmlFor="size-9">9</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="size-10" name="size-10"></input>
                <label htmlFor="size-10">10</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="size-11" name="size-11"></input>
                <label htmlFor="size-11">11</label>
              </div>
            </div>

            {/* 4. Price Range Category dropdown */}
            <div className={styles.filterCategory}>
              {/* Category title */}
              <h3 className={styles.categoryTitle + " " + styles.filterTitle}>
                Price Range
              </h3>
              {/* Category options */}
              <div className={styles.categoryOptions}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="price-0-50"
                    name="price-0-50"
                  ></input>
                  <label htmlFor="price-0-50">$0 - $50</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="price-50-100"
                    name="price-50-100"
                  ></input>
                  <label htmlFor="price-50-100">$50 - $100</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="price-100-150"
                    name="price-100-150"
                  ></input>
                  <label htmlFor="price-100-150">$100 - $150</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="price-150-200"
                    name="price-150-200"
                  ></input>
                  <label htmlFor="price-150-200">$150 - $200</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="price-200-250"
                    name="price-200-250"
                  ></input>
                  <label htmlFor="price-200-250">$200 - $250</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="price-250-300"
                    name="price-250-300"
                  ></input>
                  <label htmlFor="price-250-300">$250 - $300</label>
                </div>
              </div>
            </div>

            {/* 5. Colors Category dropdown */}
            <div className={styles.filterCategory}>
              {/* Category title */}
              <h3 className={styles.categoryTitle + " " + styles.filterTitle}>
                Colors
              </h3>
              {/* Category options */}
              <div className={styles.categoryOptions}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="color-red"
                    name="color-red"
                  ></input>
                  <label htmlFor="color-red">Red</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="color-blue"
                    name="color-blue"
                  ></input>
                  <label htmlFor="color-blue">Blue</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="color-green"
                    name="color-green"
                  ></input>
                  <label htmlFor="color-green">Green</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="color-yellow"
                    name="color-yellow"
                  ></input>
                  <label htmlFor="color-yellow">Yellow</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="color-black"
                    name="color-black"
                  ></input>
                  <label htmlFor="color-black">Black</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="color-white"
                    name="color-white"
                  ></input>
                  <label htmlFor="color-white">White</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {products.map((product) => {
          return <Product product={product} key={product._id} />;
        })}
      </div>

      {/* show more button */}
      <button className={styles.showMoreButton} onClick={handleShowMore}>
        Show More
      </button>
    </div>
  );
}

export default ProductList;
