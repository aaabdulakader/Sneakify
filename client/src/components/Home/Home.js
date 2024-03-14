import React from "react";

import homeStyles from "./Home.module.css";

function Home() {
  return (
    <div className={homeStyles.container}>
      {/* Home component */}
      <h1 className={homeStyles.title}>Home</h1>
      <p className={homeStyles.text}>
        Welcome to the home page. This is a simple example of how to use React
        Router.
      </p>

      <p className={homeStyles.text}>
        Click on the "Products" link in the header to see a list of products.
      </p>

      <p className={homeStyles.text}>
        Click on the "Contact" link in the header to see the contact page.
      </p>
    </div>
  );
}

export default Home;
