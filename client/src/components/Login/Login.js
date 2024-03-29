import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import loginFormStyles from "./Login.module.css";
import jwt_decode from "jwt-decode";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GiRunningShoe } from "react-icons/gi";

function LoginForm({ setTokenAndUser }) {
  const [showPassword, setShowPassword] = useState(false);
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  const handleShowPassword = () => {
    let passwordInput = document.querySelector("#password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  // const setTokenAndUser = (token, user) => {
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("currentUser", JSON.stringify(user));
  //   // localStorage.setItem("currentUser", user);
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    const loginLink = "http://localhost:9000/users/login";

    fetch(loginLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "1@test.c",
        password: "12",
        // email: email,
        // password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.data.user);
          setTokenAndUser(data.token, data.data.user, data.tokenExpiresIn);
        } else {
          // Show error message
          alert(data.message);
        }
      });

    console.log(email);
    console.log(password);
  };

  return (
    <div className={loginFormStyles.container}>
      <form className={loginFormStyles.form} onSubmit={handleLogin}>
        {/* <Link to="/" area-label="Home">
          <GiRunningShoe className={loginFormStyles.logo} />
        </Link> */}
        <h2 className={loginFormStyles.formTitle}>Login</h2>
        <div className={loginFormStyles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            className={loginFormStyles.input}
            type="text"
            id="email"
            name="email"
            // value="user@example.com"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete={"on"}
            autoFocus={true}
            // required
          />
        </div>
        <div className={loginFormStyles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            className={loginFormStyles.input}
            type="password"
            id="password"
            name="password"
            // value="password1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            // required
          />
        </div>
        {/* Forgot Password and Signup Links */}

        <button type="submit" className={loginFormStyles.submitButton}>
          Login
        </button>
      </form>

      <div className={loginFormStyles.signupContainer}>
        <p>Don't have an account?</p>
        <Link to="/signup" className={loginFormStyles.signupLink}>
          Sign Up
        </Link>
      </div>

      {/* <div className={loginFormStyles.forgotPasswordContainer}>
        <Link
          to="/forgotpassword"
          className={loginFormStyles.forgotPasswordLink}
        >
          Forgot Password?
        </Link>
      </div> */}
    </div>
  );
}

export default LoginForm;
