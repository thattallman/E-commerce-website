import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DressCard from "./DressCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [allItems, setAllItems] = useState([]);
  async function getItems() {
    const data = await fetch("http://localhost:8000/products");
    const json = await data.json();

    setAllItems(json);
  }

  const navigator = useNavigate();
  useEffect(() => {
    let id = sessionStorage.getItem("email");

    if (id === "" || id === null) {
      navigator("/");
    }
    getItems();
  }, []);

  return (
    <div className="flex flex-wrap pt-6">
      {allItems.map((item) => {
        return (
          <Link key={item.id} to={`/items/${item.id}`}>
            {" "}
            <DressCard {...item} />{" "}
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
