import React from "react";
import { IoMdHeart } from "react-icons/io";
import { BsFillCartPlusFill } from "react-icons/bs";

const DressCard = ({ id, title, description, image, amount, rating }) => {
  return (
    <div className="w-[270px]   bg-white shadow-lg m-2 border-2 border-gray-300 cursor-pointer">
      <img className="h-60 w-full  " src={image} />
      <h1 className="text-xs pt-3 px-3 ">{title}</h1>
      <h1 className="text-xs px-3 ">₹{amount}</h1>
      <h1 className="text-xs bg-green-600 text-white w-7 ml-3 mt-2 font-bold px-1  ">
        {rating}
      </h1>
      <div className="flex justify-between pt-5 py-2 px-3  ">
        <IoMdHeart className="text-gray-500 text-xl" />
        <BsFillCartPlusFill className="text-gray-500  text-xl" />
      </div>
    </div>
  );
};

export default DressCard;
