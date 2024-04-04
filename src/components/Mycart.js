import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import { FaCircleCheck } from "react-icons/fa6";

const Mycart = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartArray = useSelector((state) => state.cart.cartArray);

  const calculatePriceDetails = () => {
    const totalPrice = cartArray.reduce(
      (total, product) => total + product.amount * product.quantity,
      0
    );

    const deliveryCharge = 50;
    const overallTotal = totalPrice + deliveryCharge;

    return {
      totalPrice,
      deliveryCharge,
      overallTotal,
    };
  };

  const priceDetails = calculatePriceDetails();

  const handlePlaceOrder = () => {
    if (cartArray.length === 0) {
      toast.error("Cart is empty");
    } else {
      setOrderPlaced(true);
      const user = sessionStorage.getItem("email");
      const orders = {
        userId: user,
        order: { cartArray },
        tota: priceDetails.overallTotal,
      };
      fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(orders),
      })
        .then((res) => {
          toast.success("Ordered Placed  Successfully ");
        })
        .catch((err) => {
          toast.error("Failed : " + err.message);
        });
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 bg-white m-6">
        <h1 className="font-bold text-xl">My Cart</h1>
        {cartArray.length === 0 ? (
          <h1>Card is Empty</h1>
        ) : (
          cartArray.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
        <button
          className="text-white bg-blue-500 p-2 mt-3"
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
        {orderPlaced && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-lg shadow-md items-center">
            <h1 className=" flex justify-center">
              <FaCircleCheck className="text-green-600 w-32 h-32 " />
            </h1>
            <h1 className="text-xl font-bold p-2 flex justify-center">
              Order placed successfully!
            </h1>
            <h1 className="text-xs font-semibold p-2 flex justify-center">
              It will be delhivered in 5 working days
            </h1>
          </div>
        )}
      </div>

      <div className="w-72 bg-white m-6">
        <h2 className="p-2 text-xl">Price Details</h2>
        <div className="flex justify-between p-2 text-sm">
          <h1> Total Price:</h1>
          <h1>₹{priceDetails.totalPrice.toFixed(2)}</h1>
        </div>

        <div className="flex justify-between p-2 text-sm">
          <h1> Delivery Price:</h1>
          <h1>₹{priceDetails.deliveryCharge.toFixed(2)}</h1>
        </div>
        <div className="border-t border-solid border-gray-500 my-4 mx-2"></div>

        <div className="flex justify-between p-2 text-sm mt-6">
          <h1 className="text-2xl"> Total:</h1>
          <h1 className="text-2xl">₹{priceDetails.overallTotal.toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
};

export default Mycart;
