import { React, useEffect, useState } from "react";

import heroStyles from "./Hero.module.css";

function Hero() {
  const [topProducts, setTopProducts] = useState([]);
  // get top products for hero slideshow
  const link = "/products/top";

  useEffect(() => {
    function fetchData() {
      fetch(link)
        .then((response) => response.json())
        .then((data) => setTopProducts(data.documents));
    }

    fetchData();
  }, [link]);

  return <div></div>;
}

export default Hero;
