import "./App.css";
import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Home,
  Header,
  ProductList,
  Login,
  Account,
  Signup,
  // Sidebar,
} from "./components/index.js";

const setTokenAndUser = (token, user, expiration) => {
  // Set token and user data in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Set token in cookie with expiration time
  document.cookie = `jwt=${token}; path=/; max-age=${expiration}`;

  // Store expiration time in sessionStorage
  sessionStorage.setItem("tokenExpiration", Date.now() + expiration * 1000);
};

// Clear localStorage upon token expiration
const checkTokenExpiration = () => {
  const tokenExpiration = sessionStorage.getItem("tokenExpiration");
  if (tokenExpiration && Date.now() > tokenExpiration) {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("tokenExpiration");
  }

  // Redirect to login page if token is expired
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }
};

// call checkTokenExpiration() when the app loads
// checkTokenExpiration();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    setIsLoggedIn(false);

    // Redirect to home page
    window.location.href = "/";
  };

  // Function to get a cookie by name
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie starts with the name we're looking for
      if (cookie.startsWith(name + "=")) {
        // Return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
    // If the cookie is not found, return null
    return null;
  }

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} logout={logout} />
        <p className="cookie">
          {getCookie("jwt") ? "JWT Token found" : "JWT Token not found"}
        </p>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/men" element={<ProductList />} />
          {/* cart */}
          <Route exact path="/cart" element={""} />
          <Route
            exact
            path="/login"
            element={<Login setTokenAndUser={setTokenAndUser} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup setTokenAndUser={setTokenAndUser} />}
          />
          {/* <Route exact path="/account" element={<Sidebar />} /> */}
          {/* <Route path="/account/*" element={<AccountRoutes />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
