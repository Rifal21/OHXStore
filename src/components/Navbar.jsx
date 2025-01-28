import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-green-500">
          TokoKami
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-green-500">
            Home
          </Link>
          <Link to="/product" className="hover:text-green-500">
            Produk
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-100">
          <Link
            to="/"
            className="block py-2 px-4 hover:bg-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/product"
            className="block py-2 px-4 hover:bg-gray-200"
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
