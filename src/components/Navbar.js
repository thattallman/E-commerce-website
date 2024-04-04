import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ flag, setFlag }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (flag) {
      setFlag(false);
      navigate("/");
    }
  };

  const cartArray = useSelector((state) => state.cart.cartArray);
  return (
    <div className="bg-blue-500 h-14 flex ">
      <div className="w-1/2  ">
        <Link to={"/home"}>
          <h1 className="text-white text-3xl font-bold  h-full text-center py-2  cursor-pointer">
            ShopKart.
          </h1>
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-center   ">
        <ul className="flex  ">
          <Link to={"/home"}>
            <li className="px-4 text-white cursor-pointer">Products</li>
          </Link>
          {flag ? (
            <li
              className="px-4 text-white cursor-pointer"
              onClick={handleLogin}
            >
              Logout
            </li>
          ) : (
            <li className="px-4 text-white cursor-pointer">Login</li>
          )}

          <li className="py-1">
            <Link to={"/cart"}>
              <FaCartShopping className="h-5 cursor-pointer" />
            </Link>
          </li>

          <li>
            {cartArray.length > 0 && (
              <div className="absolute bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartArray.length}
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
