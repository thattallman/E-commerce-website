import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiCircleRemove } from "react-icons/ci";
import { deleteProduct, pushData } from "../utils/cartData";

const ProductCard = ({ id, title, description, image, amount, rating }) => {
  const dispatch = useDispatch();
  const cartArray = useSelector((state) => state.cart.cartArray);

  const productQuantity =
    cartArray.find((product) => product.id === id)?.quantity || 1;

  const increaseQuantity = () => {
    dispatch(
      pushData({
        id,
        title,
        description,
        image,
        amount,
        rating,
        quantity: productQuantity,
      })
    );
  };

  const handleRemove = () => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="w-full   bg-white shadow-lg  border-2 border-gray-300 cursor-pointer flex p-4">
      <img className="h-28 w-1/4" src={image} />
      <div>
        <h1 className="text-xl text-gray-600 font-bold pt-3 px-3">{title}</h1>
        <h1 className="text-sm px-3 flex justify-between ">
          ₹{amount}
          <CiCircleRemove
            className="text-red-700 w-9 h-7"
            onClick={handleRemove}
          />
        </h1>
        <div className="flex">
          <button className="px-6" onClick={increaseQuantity}>
            +
          </button>
          <h1 className="px-6 border border-black">{productQuantity}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
