import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Gunakan useNavigate jika menggunakan React Router v6
import axios from "axios";
import defaultImage from "../images/web-project-2.jpg";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Untuk React Router v5
  // const navigate = useNavigate(); // Jika menggunakan React Router v6

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.sheetbest.com/sheets/5ff3c2d9-a9b3-4764-b673-699a4510c0e6"
        );
        setProducts(response.data);

        // Extract unique categories from products data
        const uniqueCategories = [
          "all", // 'all' category to show all products
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    // Navigate to products page and filter by category
    // history.push(`/products?category=${category}`);
    // Jika menggunakan React Router v6, gunakan navigate
    navigate(`/product?category=${category}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-green-500 text-white rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Selamat Datang di OHXStore</h1>
        <p className="text-lg">Belanja sekarang dan temukan produk terbaik!</p>
      </div>

      {/* Kategori Produk */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Kategori Produk</h2>
        <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="inline-block bg-gray-100 border rounded-lg p-4 mx-2 text-center hover:shadow-lg"
            >
              {category === "all" ? "Semua Kategori" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Produk Preview */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Produk Preview</h2>
        <div className="overflow-x-auto whitespace-nowrap no-scrollbar flex items-center">
          {products.slice(0, 7).map((product, index) => (
            <div
              key={product.id}
              className="inline-block bg-white border rounded-lg p-4 mx-2 text-center"
            >
              <img
                src={product.image || defaultImage}
                alt={product.name}
                className="w-full h-32 object-cover rounded mb-4"
                onError={(e) => (e.target.src = defaultImage)}
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">
                Rp {parseInt(product.price, 10).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
          <div
              className="inline-flex items-center justify-center bg-white border rounded-lg p-4 mx-2 text-center"
            >
          <button
            onClick={() => navigate("/product")}
            className="inline-flex animate-pulse items-center justify-center transition-all duration-200"
          >
            Lihat Lebih Banyak <FaArrowRight size={20} className="ml-2" />
          </button>
            </div>
        </div>
        {/* Button untuk melihat lebih banyak produk */}
        {/* <div className="flex justify-center mt-4">
          <button
            // onClick={() => history.push("/products")} // Untuk React Router v5
            onClick={() => navigate("/product")} // Jika menggunakan React Router v6
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200"
          >
            Lihat Lebih Banyak
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
