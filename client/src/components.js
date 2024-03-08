import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const link = "http://localhost:9000/products/";
        const res = await fetch(link);
        const data = await res.json();
        const productsData = data.data.products;
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product">
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>{product.subTitle}</p>
            <p>{product.brand}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProductList };
