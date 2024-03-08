import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { ProductList } from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Products</h1>
        <ProductList />
      </header>
    </div>
  );
}

export default App;
