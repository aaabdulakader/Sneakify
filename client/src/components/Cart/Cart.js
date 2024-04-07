import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MightLike } from "../index";

import styles from "./Cart.module.css";

// Icons

import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LuMinus } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

// states

const CartItem = ({ item, handleRemove, handleAddAndminus }) => {
  return (
    <div className={styles.cartItem}>
      <Link to={`/products/${item.slug}`} className={styles.cartItemLink}>
        <img src={item.image} alt="product" className={styles.cartItemImg} />
      </Link>

      <div className={styles.cartItemInfo}>
        <h3 className={styles.cartItemTitle}>{item.title}</h3>
        <div className={styles.cartItemActions}>
          <p className={styles.size}>{item.selectedSize}</p>
          <div className={styles.itemQuantity}>
            <FiMinus
              className={styles.minus}
              onClick={() =>
                handleAddAndminus(item._id, "minus", item.selectedSize)
              }
            />
            <p className={styles.quantity}>{item.quantity}</p>
            <IoAdd
              className={styles.add}
              onClick={() =>
                handleAddAndminus(item._id, "add", item.selectedSize)
              }
            />
          </div>
          <p className={styles.price}>${item.price}</p>
          <AiOutlineDelete
            className={styles.remove}
            onClick={() => handleRemove(item._id, item.selectedSize, true)}
          />
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const [cartitems, setCartItems] = useState([]);

  const subtotal = cartitems?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleRemove = (id, size, deleteButton = false) => {
    let newCart;
    if (deleteButton) {
      // Remove the item based on ID and size without considering quantity
      newCart = cartitems.filter(
        (item) => !(item._id === id && item.selectedSize === size)
      );
    } else {
      // Remove only if quantity is 0
      newCart = cartitems.filter(
        (item) =>
          !(
            item._id === id &&
            item.selectedSize === size &&
            item.quantity === 0
          )
      );
    }

    setTimeout(() => {
      setCartItems(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      // window.location.reload();
    }, 1000);
  };

  const handleAddAndminus = (id, type, size) => {
    const newCart = cartitems.map((item) => {
      if (item._id === id && item.quantity >= 1 && item.selectedSize === size) {
        type === "add" ? (item.quantity += 1) : (item.quantity -= 1);
      }
      return item;
    });

    newCart.forEach((item) => {
      if (item.quantity === 0) {
        handleRemove(item._id, item.selectedSize);
      }
    });
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(cartitems));
  };

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart")));
  }, []);
  //   console.log(cartitems);
  const totalQuantity = cartitems
    ? cartitems.reduce((acc, item) => {
        return acc + +item.quantity;
      }, 0)
    : 0;
  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <div className={styles.cartInfo}>
          <div className={styles.cartHeader}>
            <h1 className={styles.cartTitle}>Shopping Cart</h1>
            <p className={styles.cartItemsCount}>{totalQuantity} items</p>
          </div>
          <div className={styles.cartItems}>
            {cartitems ? (
              cartitems.map((item) => {
                if (item.quantity === 0) {
                  // handleRemove(item._id, item.selectedSize);
                  return null;
                }

                return (
                  <CartItem
                    key={Math.random()}
                    item={item}
                    handleRemove={handleRemove}
                    handleAddAndminus={handleAddAndminus}
                  />
                );
              })
            ) : (
              <p>No items in cart</p>
            )}
          </div>
        </div>

        {/* cart summary */}
        <div className={styles.cartSummary}>
          <h3 className={styles.cartSummaryTitle}>Cart Summary</h3>
          <div className={styles.cartSummaryItem}>
            <p className={styles.cartSummaryItemText}>Subtotal</p>
            <p className={styles.cartSummaryItemPrice}>${subtotal || "-"}</p>
          </div>
          {/* <div className={styles.cartSummaryItem}>
          <p className={styles.cartSummaryItemText}>Shipping</p>
          <p className={styles.cartSummaryItemPrice}>$10</p>
        </div> */}
          <div className={styles.cartSummaryItem}>
            <p className={styles.cartSummaryItemText}>Estimated Tax</p>
            <p className={styles.cartSummaryItemPrice}>
              {/* Round to the nearest cent */}$
              {Math.round(subtotal * 0.05 * 100) / 100 || "-"}
            </p>
          </div>
          <div className={styles.cartSummaryItem}>
            <p className={styles.cartSummaryItemText}>Total</p>
            <p className={styles.cartSummaryItemPrice}>
              ${subtotal + subtotal * 0.05 || "-"}
            </p>
          </div>

          <button
            className={styles.checkoutButton}
            disabled={totalQuantity === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <MightLike />
    </div>
  );
}

export default Cart;
