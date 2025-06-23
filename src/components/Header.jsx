import React from "react";
import "./index.css";
import { useState } from "react";

const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Item 2",
    },
    {
      id: 3,
      checked: false,
      item: "Item 3",
    },
  ]);
};

const Header = () => {
  return (
    <div>
      <h1>Groceries List</h1>
    </div>
  );
};

export default Header;
