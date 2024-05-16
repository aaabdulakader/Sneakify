import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./ProductDetail.module.css";

// icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { Alert } from "../index";

import {
  IoIosArrowRoundForward,
  IoIosArrowRoundBack,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";

// pop up component after adding to cart

const AddedToCart = ({ product, size, color, quantity }) => {
  return (
    <div className={styles.addedToCart}>
      <p className={styles.addedToCartMessage}>Added to Cart</p>
      <div className={styles.productInfo}>
        <img src={product.images[0]} alt={product.title} />
        <div className={styles.productDetails}>
          <p className={styles.productTitle}>{product.title}</p>
          <p>${product.price}</p>
          <p>Size {size}</p>
          <p>Quantity {quantity}x</p>
        </div>
      </div>
      <div className={styles.addedToCartButtons}>
        <Link to="/cart">View Cart</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
};

// const cart
function ProductDetail() {
  const [currentImage, setCurrentImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(true);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  let [product, setProduct] = useState();
  const [isFavorited, setIsFavorited] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [addedToCart, setAddedToCart] = useState(false);
  // JSON.parse(localStorage.getItem("curretProduct"))
  //   const user = JSON.parse(localStorage.getItem("currentUser"))._id;
  //   const link = `http://localhost:9000/users/${user}/cart`;

  let [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  let favorites = user ? user.favorites : [];
  let link;
  if (user) {
    // user = JSON.parse(user);
    link = `http://localhost:9000/users/${user._id}/cart`;
  }

  let getCartItems = async () => {
    if (!user) {
      setCartItems([]);
      return;
    } else {
      const response = await fetch(link);
      const data = await response.json();
      setCartItems(data.cart.items);
    }
  };

  // only makes a request if the user is logged in
  useEffect(() => {
    getCartItems();
  }, []);

  let productSlug = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (!product) {
      const serverLink = `http://localhost:9000/products/slug/${productSlug}`;
      // Fetch product from server
      fetch(serverLink)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.product);
        });
    }
  }, []);

  useEffect(() => {
    if (favorites && product) {
      setIsFavorited(favorites.includes(product._id));
    }
  }, [product, favorites]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);

    if (isFavorited && favorites && favorites.includes(product._id)) {
      favorites = favorites.filter((favorite) => favorite !== product._id);
    } else {
      favorites = [...favorites, product._id];
    }

    // update the user's favorites in the database
    request("PATCH", `http://localhost:9000/users/${user._id}`, {
      favorites,
    }).then((data) => {
      setUser(data.documents);
    });
  };

  if (product && !currentImage) {
    setCurrentImage(product.images[0]);
  }

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  const handleArrowClick = (direction) => {
    const currentIndex = product.images.indexOf(currentImage);
    let nextIndex;
    direction === "forward"
      ? (nextIndex = currentIndex + 1)
      : (nextIndex = currentIndex - 1);

    if (nextIndex < 0) {
      nextIndex = product.images.length - 1;
    }
    if (nextIndex >= product.images.length) {
      nextIndex = 0;
    }
    setCurrentImage(product.images[nextIndex]);
  };

  const handleOpenDropdown = (dropdownType) => {
    if (dropdownType === "size") {
      setSizeDropdownOpen(!sizeDropdownOpen);
    } else if (dropdownType === "color") {
      setColorDropdownOpen(!colorDropdownOpen);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      // save the product to local storage
      localStorage.setItem("currentProduct", JSON.stringify(product));
      // redirect to login page
      window.location.href = "/login";
      return;
    }

    //if no product is selected
    if (!product) {
      return;
    }

    //   if no size is selected
    if (!selectedSize) {
      setSelectedSize("none");
      return;
    }
    //   if no color is selected
    if (!selectedColor && product.colors.length > 0) {
      setSelectedColor("none");
      setColorDropdownOpen(true);
      return;
    }

    const { _id, title, price, images, slug, size, color } = product;
    //   post request
    request("POST", link, {
      user,
      items: [
        {
          product: _id,
          title,
          price,
          image: images[0],
          size: selectedSize,
          color: selectedColor,
          quantity: +selectedQuantity,
          slug: slug,
        },
      ],
    })
      .then((data) => {
        setCartItems(data.cart.items);
        setAlert({ message: data.message, type: "success" });
        setAddedToCart(true);

        setTimeout(() => {
          setAddedToCart(false);
        }, 6000);
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "error" });
      });

    //reload page
    setTimeout(() => {
      //   window.location.reload();
    }, 1500);
  };

  const request = async (method, url, data) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  return (
    // add added class to container if added to cart
    <div className={styles.container}>
      {addedToCart && (
        <AddedToCart
          product={product}
          size={selectedSize}
          color={selectedColor}
          quantity={selectedQuantity}
        />
      )}
      {/* product details */}
      {product && (
        <div
          className={
            styles.productDetail + " " + (addedToCart ? " " + styles.added : "")
          }
          onClick={() => setAddedToCart(false)}
        >
          <section className={styles.productDetailInfo}>
            <div className={styles.info}>
              <p>{product.subTitle}</p>
              <h2 className={styles.productDetailTitle}>{product.title}</h2>
              <p>${product.price}</p>

              <img
                src={currentImage}
                alt={product.title}
                className={styles.productDetailImage}
              />

              <div className={styles.arrows}>
                <IoIosArrowRoundBack
                  className={styles.arrow}
                  onClick={() => handleArrowClick("back")}
                />
                <IoIosArrowRoundForward
                  className={styles.arrow}
                  onClick={() => handleArrowClick("forward")}
                />
              </div>
            </div>
            {/* <faRegHeart className={styles.heartIcon} /> */}
            {/*carousel images */}

            <div className={styles.carousel}>
              {product.images.map((product, index) => {
                return (
                  <img
                    src={product}
                    alt={product.title}
                    className={
                      styles.carouselImage +
                      (currentImage === product ? " " + styles.active : "")
                    }
                    key={index}
                    onClick={() => handleImageClick(product)}
                    onMouseEnter={() => setCurrentImage(product)}
                  />
                );
              })}
            </div>
          </section>
          {/* selections */}
          <section className={styles.productSelections}>
            {/* product selections: sizes */}
            <div className={styles.productSelectionsSizes}>
              <div
                className={styles.productSelectionsHeader}
                onClick={() => handleOpenDropdown("size")}
              >
                <p className={styles.productSelectionsTitle}>SELECT SIZE</p>
                <IoIosArrowDown
                  className={
                    styles.dropdownArrow +
                    (sizeDropdownOpen ? " " + styles.rotate : "")
                  }
                />
              </div>
              {sizeDropdownOpen && (
                <div className={styles.sizes}>
                  {product.sizes.map((size, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          styles.size +
                          " " +
                          (selectedSize === size ? styles.active : "")
                        }
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </div>
                    );
                  })}
                </div>
              )}
              {selectedSize === "none" && (
                <div className={styles.error}>Please select a size</div>
              )}
              {/* <button className={styles.addToCartButton}>Add to Cart</button> */}
            </div>
            {/* product selections: colors */}
            {product.colors.length > 0 && (
              <div className={styles.productSelectionsColors}>
                <div
                  className={styles.productSelectionsHeader}
                  onClick={() => handleOpenDropdown("color")}
                >
                  <p className={styles.productSelectionsTitle}>SELECT COLOR</p>
                  <IoIosArrowDown
                    className={
                      styles.dropdownArrow +
                      (colorDropdownOpen ? " " + styles.rotate : "")
                    }
                  />
                </div>
                {colorDropdownOpen && (
                  <div className={styles.colors}>
                    {product.colors.map((color, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            styles.color +
                            " " +
                            (selectedColor === color ? styles.active : "")
                          }
                          style={{ backgroundColor: color }}
                          title={color}
                          onClick={() => setSelectedColor(color)}
                        ></div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {selectedColor === "none" && (
              <div className={styles.error}>Please select a color</div>
            )}

            {/* Quantity and add to cart button */}
            <div className={styles.productSelectionsFooter}>
              <div className={styles.quantity}>
                <label htmlFor="quantity" className={styles.quantityLabel}>
                  <FaMinus
                    className={styles.quantityIcon}
                    onClick={() => {
                      if (selectedQuantity > 1) {
                        setSelectedQuantity(+selectedQuantity - 1);
                      }
                    }}
                  />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    // defaultValue={selectedQuantity}
                    value={selectedQuantity}
                    className={styles.quantityInput}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  />
                  <FaPlus
                    className={styles.quantityIcon}
                    onClick={() => setSelectedQuantity(+selectedQuantity + 1)}
                  />
                </label>
              </div>
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              {isFavorited ? (
                <FaHeart
                  className={styles.heartIcon + " " + styles.favoriteIcon}
                  onClick={handleFavorite}
                />
              ) : (
                <CiHeart
                  className={styles.heartIcon}
                  onClick={handleFavorite}
                />
              )}
            </div>

            {/*  */}
          </section>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
