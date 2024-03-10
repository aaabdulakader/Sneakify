import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home, Header, ProductList } from "./components";

function App() {
  // states
  // const [products, setProducts] = React.useState([]);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/men" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
