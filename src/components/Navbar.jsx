import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { FaBoxOpen, FaChevronDown } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { motion } from "framer-motion";
import { FaShop } from "react-icons/fa6";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex justify-center items-center">
          <img src="../image/logo.png" alt="" className="w-14 h-14 mr-1" />
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-2xl font-bold text-green-500">OHXStore</h1>
            <p className="text-sm text-gray-500">
              Solusi cerdas untuk kebutuhan digital
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center space-x-8">
          <Link
            to="/"
            className={`${
              isActive("/") ? "text-green-500 font-semibold" : "text-gray-700"
            } hover:text-green-500 transition`}
          >
            Home
          </Link>
          <Link
            to="/product"
            className={`${
              isActive("/product")
                ? "text-green-500 font-semibold"
                : "text-gray-700"
            } hover:text-green-500 transition`}
          >
            Produk
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-gray-700 hover:text-green-500 transition focus:outline-none"
              >
                <span className="mr-2">{user.username}</span>
                <FaChevronDown size={12} />
              </button>
              {dropdownOpen && (
                <div className="absolute flex flex-col left-0 top-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <Link
                    to={"/admin/product"}
                    className="w-full text-left px-4 py-4 inline-flex items-center gap-2 hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    <FaBoxOpen size={20} /> Kelola Produk
                  </Link>
                  <Link
                    to={"/admin/order"}
                    className="w-full text-left px-4 py-4 inline-flex items-center gap-2 hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    <FaShop size={20} /> Kelola Pesanan
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-4 hover:bg-gray-200 inline-flex items-center gap-2 transition duration-300 ease-in-out"
                  >
                    <HiOutlineLogout size={20} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/masook"
              className="hover:bg-orange-600 transition bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl hover:bg-green-500 transition-all duration-300 hover:text-white p-2 rounded"
        >
          <RiMenu3Fill />
        </button>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className={`overflow-hidden md:hidden bg-gray-100`}
      >
        <div className="flex flex-col items-start py-2">
          <Link
            to="/"
            className={`block w-full py-2 px-4 text-left ${
              isActive("/") ? "bg-green-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/product"
            className={`block w-full py-2 px-4 text-left ${
              isActive("/product") ? "bg-green-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Produk
          </Link>

          {/* Login/Logout Button on Mobile */}
          {user ? (
            <div className="block w-full text-center">
                <Link
                  to="/admin/product"
                  className={`block w-full py-2 px-4 text-left ${
                    isActive("/admin/product") ? "bg-green-500 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Kelola Produk
                </Link>
                <Link
                  to="/admin/order"
                  className={`block w-full py-2 px-4 text-left ${
                    isActive("/admin/order") ? "bg-green-500 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Kelola Pesanan
                </Link>
              <button onClick={handleLogout} className="block w-full py-2 px-4 text-center bg-orange-500 text-white">Logout</button>
            </div>
          ) : (
            <Link
              to="/masook"
              className="block w-full py-2 px-4 text-left bg-orange-500 text-white hover:bg-green-600"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;
