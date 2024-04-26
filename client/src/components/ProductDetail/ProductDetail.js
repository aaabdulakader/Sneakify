import { React, useState, useEffect } from "react";

import styles from "./ProductDetail.module.css";

// icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import {
  IoIosArrowRoundForward,
  IoIosArrowRoundBack,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";

// const cart
function ProductDetail() {
  const [currentImage, setCurrentImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(true);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  let [product, setProduct] = useState(
    JSON.parse(localStorage.getItem("curretProduct"))
  );
  //   const user = JSON.parse(localStorage.getItem("currentUser"))._id;
  //   const link = `http://localhost:9000/users/${user}/cart`;

  const user = JSON.parse(localStorage.getItem("currentUser"));
  let link;
  if (user) {
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
          //   localStorage.setItem("currentProduct", JSON.stringify(data.product));
          setProduct(data.product);
          //   console.log("Server", data.product);
        });
    }
  }, []);

  // server link

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  //   if (product.colors.length > 0 && !selectedColor && selectedSize) {
  //     setColorDropdownOpen(true);
  //   }

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
          slug,
        },
      ],
    });

    //reload page
    window.location.reload();
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

  //   console.log(product.title);
  return (
    <div>
      {/* back button */}
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        Back
      </button>

      {/* product detail */}
      {product && (
        <div className={styles.productDetail}>
          <section className={styles.productDetailInfo}>
            <div className={styles.info}>
              <p>{product.subTitle}</p>
              <h2 className={styles.productDetailTitle}>{product.title}</h2>
              <p>${product.price}</p>

              <img
                //   src={require("./image-6.webp")}
                // src={require("./p-6000-premium-shoes-XkgpKW.webp")}
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
                {/* Dropdown */}
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="1"
                  className={styles.quantityInput}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                />
              </div>
              <button
                className={styles.addToCartButton}
                onClick={
                  handleAddToCart
                  //   () => {
                  //     // set color selection to first color in array
                  //     !selectedSize
                  //       ? setSelectedSize("none")
                  //       : setSelectedSize(selectedSize);

                  //     !selectedColor && product.colors.length > 0
                  //       ? setSelectedColor("none")
                  //       : setSelectedColor(selectedColor);

                  //     if (!selectedColor) setColorDropdownOpen(true);
                  //         }
                }
              >
                Add to Cart
              </button>

              {/* favorite */}
              {isFavorited ? (
                <FaHeart
                  className={styles.heartIcon + " " + styles.favoriteIcon}
                  onClick={handleFavorite}
                />
              ) : (
                <FaRegHeart
                  className={styles.heartIcon}
                  onClick={handleFavorite}
                />
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
