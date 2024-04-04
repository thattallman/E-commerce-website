import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ flag, setFlag }) => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/users/" + formData.email)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (Object.keys(res).length === 0) {
          toast.error("Plzz enter correct email or password");
        } else {
          if (res.password == formData.password) {
            toast.success("Login successfull ");
            sessionStorage.setItem("email", formData.email);
            navigate("/home");
            setFlag(true);
          } else {
            toast.error("Enter corrrect password");
          }
        }
      })
      .catch((err) => {
        toast.error("Enter correct email address");
      });
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md max-w-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex justify-between">
          <p className="mt-4 text-sm text-gray-600 ">
            New user?{" "}
            <Link className="hover:text-blue-400" to={"/registration"}>
              Create an account
            </Link>
          </p>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-12 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
