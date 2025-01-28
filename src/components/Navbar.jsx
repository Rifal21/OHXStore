import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan kata kunci pencarian
  const location = useLocation();
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${searchQuery.trim()}`); // Arahkan ke halaman produk dengan query pencarian
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex justify-center items-center">
          <img src="../image/logo.png" alt="" className="w-14 h-14 mr-1" />
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-2xl font-bold text-green-500">
              OHXStore
            </h1>
            <p className="text-sm text-gray-500">Solusi cerdas untuk kebutuhan digital</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
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
        </div>

        {/* Search Form */}
        {/* <form onSubmit={handleSearchSubmit} className="flex items-center ml-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600 transition"
          >
            Cari
          </button>
        </form> */}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 transition-all duration-300">
          <Link
            to="/"
            className={`block py-2 px-4 ${isActive("/") ? "bg-green-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/product"
            className={`block py-2 px-4 ${isActive("/product") ? "bg-green-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setIsOpen(false)}
          >
            Produk
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
