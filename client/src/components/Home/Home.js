import React from "react";

import homeStyles from "./Home.module.css";

function Home() {
  return (
    <div className={homeStyles.container}>
      {/* Home component */}
      <h1 className={homeStyles.title}>Home</h1>
    </div>
  );
}

export default Home;
