import React from "react";
import "./index.css";

const Content = () => {
  const handleName = () => {
    let name = "Muhammed";
    return name;
  };
  return (
    <div>
      <p>Hello {handleName()}!</p>
    </div>
  );
};

export default Content;
