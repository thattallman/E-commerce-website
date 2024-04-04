import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Navbar from "./components/Navbar";
import { Toast, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import DressDetails from "./components/DressDetails";
import { Provider } from "react-redux";
import store from "./utils/store";
import Mycart from "./components/Mycart";
import { useState } from "react";

function App() {
  const [flag, setFlag] = useState(false);
  const notify = () => {
    toast.success("Basic Notification");
  };
  return (
    <BrowserRouter>
      <ToastContainer> </ToastContainer>
      <div className="bg-blue-50 min-h-screen">
        <Provider store={store}>
          <Navbar flag={flag} setFlag={setFlag} />

          <Routes>
            <Route path="/" element={<Login flag={flag} setFlag={setFlag} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/items/:id" element={<DressDetails />} />
            <Route path="/cart" element={<Mycart />} />
          </Routes>
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
