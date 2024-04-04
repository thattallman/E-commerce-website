import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiHeartCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { pushData } from "../utils/cartData";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const DressDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [cloth, setcloth] = useState(null);
  const { id } = params;
  useEffect(() => {
    getClothInfo();
  }, []);

  const handleAddToCart = (e) => {
    const clothWithQuantity = { ...cloth, quantity: 1 };

    dispatch(pushData(clothWithQuantity));
    toast.success("Successfully added to cart", { autoClose: 1000 });
  };
  async function getClothInfo() {
    const data = await fetch(`http://localhost:8000/products/${id}`);
    const json = await data.json();
  
    setcloth(json);
  }

  return (
    <div className="flex">
      <div className="w-1/2  flex items-center justify-center ">
        <img className="h-2/3  " src={cloth?.image} />
      </div>
      <div className="w-1/2 ">
        <div className="h-1/2 border-l-4 border-gray-300 p-4 my-10">
          <h1 className="flex justify-between font-bold text-4xl font-sans p-4">
            {cloth?.title}
            <BiHeartCircle className="text-gray-500  text-5xl " />
          </h1>
          <h1 className="p-4  text-sm">{cloth?.description}</h1>
          <h1 className="p-4 font-bold text-4xl">₹{cloth?.amount}</h1>
        </div>
        <div className="h-1/2  flex  justify-center">
          <div>
            <Link to={"/cart"}>
              <button className="border-2 border-black px-14 py-6 font-bold mx-8 hover:bg-black hover:text-white">
                Buy Now
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className="border-2 border-black px-14 py-6 font-bold hover:bg-black hover:text-white"
            >
              Add to Basket{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressDetails;
