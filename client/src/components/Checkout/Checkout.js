import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Checkout.module.css";

function Checkout() {
  const [cartitems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  // const [showDefault, setShowDefault] = useState(true);
  const [shipping_address, setShipping_address] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    isDefault: false,
  });

  const states = [
    "Select State",
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const handleOnChange = (e) => {
    setShipping_address({
      ...shipping_address,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const fetchCart = async () => {
      const response = await fetch(
        `http://localhost:9000/users/${currentUser._id}/cart`
      );
      const data = await response.json();
      setCartItems(data.cart.items);
    };

    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:9000/users/${currentUser._id}`
      );
      const data = await response.json();
      setUser(data.document);
      setCurrentUser(data.document);
      //   setShowForm(!currentUser.shipping_addresses.length > 0);
    };

    fetchUser();
    fetchCart();
  }, [currentUser._id]);

  const subtotal = cartitems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + subtotal * 0.05;

  //   console.log(user.shipping_addresses);
  //   console.log(showForm);

  //   if (user.shipping_addresses?.length === 0) {
  //     setShowForm(true);
  //   }

  //   console.log(selectedAddress);
  // example:

  // const shipping_ddress = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   street: "1234 Main St",
  //   city: "Minneapolis",
  //   state: "MN",
  //   zip: "55401",
  //   country: "USA",
  //   phone: "123-456-7890",
  //   isDefault: true,
  // };

  const handleSaveAddress = () => {
    // comparing the selected address with the user's shipping addresses
    if (user.shipping_addresses) {
      const addressExists = user.shipping_addresses.find(
        (address) => address._id === shipping_address._id
      );

      // updating the selected address if it exists in the user's shipping addresses
      if (addressExists) {
        // check if the selected address is the default address

        if (shipping_address.isDefault) {
          user.shipping_addresses.forEach((address) => {
            address.isDefault = false;
          });
        }

        fetch(`http://localhost:9000/users/${user._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shipping_addresses: user.shipping_addresses.map((address) =>
              address._id === shipping_address._id
                ? { ...shipping_address }
                : address
            ),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.documents);
            setShowForm(false);
          });
      } else {
        // add the selected address to the user's shipping addresses
        fetch(`http://localhost:9000/users/${user._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shipping_addresses: [...user.shipping_addresses, shipping_address],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.documents);
            setShowForm(false);
          });
      }
    }

    // if the selected address is in the user's shipping addresses
    // update the selected address
    // else add the selected address to the user's shipping addresses

    // fetch(`http://localhost:9000/users/${user._id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     shipping_addresses: [...user.shipping_addresses, shipping_address],
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setUser(data.documents);
    //   });
  };

  //   console.log(user);

  // if (showDefault && user.shipping_addresses) {
  //   user.shipping_addresses = user.shipping_addresses.filter(
  //     (address) => address.isDefault
  //   );
  // } else {
  //   user.shipping_addresses = user.shipping_addresses;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.checkout}>
        {/* saved address */}

        <div className={styles.forms}>
          <h2>Shipping Information</h2>
          {user.shipping_addresses && !showForm && (
            <>
              {/* {user.shipping_addresses && <h2>Saved Addresses</h2>} */}
              <div className={styles.savedAddresses}>
                {user.shipping_addresses &&
                  user.shipping_addresses.map((address, i) => (
                    <div
                      className={
                        styles.savedAddress +
                        " " +
                        (selectedAddress._id === address._id
                          ? styles.selected
                          : "")
                      }
                      key={i}
                    >
                      <label htmlFor={address._id}>
                        <input
                          type="radio"
                          name="address"
                          id={address._id}
                          value="address"
                          onChange={(e) => {
                            setSelectedAddress(address);
                          }}
                        />
                        <h3>{address.firstName + " " + address.lastName}</h3>
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p>{address.country}</p>
                        <p>{address.phone}</p>
                      </label>
                      <button
                        onClick={() => {
                          setShipping_address(address);
                          setShowForm(true);
                          setEditing(true);
                        }}
                        className={styles.edit}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
              </div>
            </>
          )}
          {showForm && (
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">
                  First Name
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={editing && shipping_address.firstName}
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
                <label htmlFor="lastName">
                  Last Name
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={editing && shipping_address.lastName}
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    value={editing && shipping_address.email}
                    placeholder="email@example.com"
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
                <label htmlFor="phone">
                  Phone
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="123-456-7890"
                    value={editing && shipping_address.phone}
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="street">
                  Street
                  <input
                    type="text"
                    id="street"
                    name="street"
                    placeholder="1234 Main St"
                    value={editing && shipping_address.street}
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="city">
                  City{" "}
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Minneapolis"
                    value={editing ? shipping_address.city : null}
                    onChange={handleOnChange}
                  />
                </label>
                <label htmlFor="state">
                  State{" "}
                  <select
                    //   dropdown
                    type="text"
                    id="state"
                    name="state"
                    placeholder="MN"
                    value={editing ? shipping_address.state : ""}
                    onChange={handleOnChange}
                  >
                    {states.map((state) => (
                      <option value={state}>{state}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="zip">
                  Zip{" "}
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    placeholder="55401"
                    value={editing && shipping_address.zip}
                    onChange={handleOnChange}
                  />
                </label>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="country">
                  Country{" "}
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="USA"
                    // value={shipping_address.country}
                    onChange={handleOnChange}
                  />
                </label>
              </div>

              <div className={styles.formGroup + " " + styles.default}>
                <label htmlFor="isDefault">Set as default address</label>
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={shipping_address.isDefault}
                  onChange={(e) =>
                    setShipping_address({
                      ...shipping_address,
                      isDefault: e.target.checked,
                    })
                  }
                />
              </div>
            </form>
          )}

          {/* add new address button*/}

          {!showForm && (
            <button
              className={styles.addAddressBtn}
              onClick={() => {
                setShowForm(true);
                setShipping_address({});
              }}
            >
              Add New Address
            </button>
          )}
          {/* save address button */}
          <div className={styles.saveAddressBtns}>
            {showForm && (
              <>
                <button
                  className={styles.saveAddressBtn}
                  onClick={() => {
                    setShowForm(false);
                    setShipping_address({});
                  }}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveAddressBtn}
                  onClick={handleSaveAddress}
                >
                  Save Address
                </button>
              </>
            )}
          </div>

          {/* payment method */}
          <h2>Payment Method</h2>
          <div className={styles.paymentMethod}>
            <div className={styles.payment}>
              <label htmlFor="creditCard" className={styles.paymentLabel}>
                Credit Card
              </label>
              <input
                type="radio"
                name="paymentMethod"
                id="creditCard"
                value="creditCard"
                // onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className={styles.payment}>
              <label htmlFor="paypal">PayPal</label>
              <input
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="paypal"
              />
            </div>
          </div>
        </div>
        <div className={styles.order}>
          <h2>Order Summary</h2>
          <div className={styles.orderItems}>
            {cartitems &&
              cartitems.map((item, i) => (
                <Link to={item.slug} className={styles.orderItem} key={i}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemDetails}>
                    <h3>{item.title}</h3>
                    <p>Price: {item.price}</p>
                    <p>Size: {item.size}</p>
                    {item.color && <p>Color: {item.color}</p>}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </Link>
              ))}
          </div>
          <div className={styles.orderTotal}>
            <h3>
              Subtotal:
              {total}
            </h3>
            <h3>Total:</h3>
            <p>
              $
              {cartitems &&
                cartitems.reduce((acc, item) => acc + item.price, 0)}
            </p>
            <button className={styles.placeOrderBtn}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
