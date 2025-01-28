import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaCartPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation
import defaultImage from "../images/web-project-2.jpg";

function Product() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State untuk modal
  const [fadeInClass, setFadeInClass] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // State untuk kategori yang dipilih
  const [categories, setCategories] = useState([]); // State untuk daftar kategori
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian produk

  const location = useLocation(); // Mengambil informasi lokasi (URL)

  // Fetch data from the spreadsheet API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.sheetbest.com/sheets/5ff3c2d9-a9b3-4764-b673-699a4510c0e6"
        );
        setProducts(response.data);
        setLoading(false);

        // Extract unique categories from products data
        const uniqueCategories = [
          "all", // Add 'all' as an option to show all products
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Menggunakan useLocation untuk mendapatkan kategori dari URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");

    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl); // Set category jika ada di URL
    } else {
      setSelectedCategory("all"); // Default ke "all" jika tidak ada kategori yang valid di URL
    }
  }, [location, categories]); // Setiap ada perubahan URL atau kategori

  useEffect(() => {
    if (products.length > 0) {
      const newFadeInClass = products.map((_, index) => {
        return { className: "opacity-0", delay: index * 100 }; // delay setiap produk berdasarkan index
      });

      setFadeInClass(newFadeInClass);

      // Trigger the fade-in animation with delay
      setTimeout(() => {
        const updatedFadeInClass = newFadeInClass.map((item) => ({
          ...item,
          className: "opacity-100 transition-opacity duration-500",
        }));
        setFadeInClass(updatedFadeInClass);
      }, 200); // Small delay before starting the animation
    }
  }, [products]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    // Update URL query parameter berdasarkan kategori yang dipilih
    window.history.pushState({}, "", `?category=${category}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Filter products based on category and search query
  const filteredProducts =
    selectedCategory === "all"
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products
          .filter((product) => product.category === selectedCategory)
          .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-gray-500">Memuat produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Produk Kami</h1>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "Semua Kategori" : category}
            </option>
          ))}
        </select>
        <form onSubmit={handleSearchSubmit} className="flex w-auto md:w-1/4 mb-4 sm:mb-0">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari produk..."
            className="p-2 border border-gray-300 rounded-l-md focus:outline-none w-full"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600 transition"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${fadeInClass[index]?.className}`}
            style={{ transitionDelay: `${fadeInClass[index]?.delay}ms` }} // Set delay for each product
          >
            <img
              src={product.image || defaultImage}
              alt={product.name}
              className="w-full h-48 object-cover"
              onError={(e) => (e.target.src = defaultImage)}
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold md:text-xl mb-2">{product.name}</h2>
                <p className="text-xs w-fit bg-rose-600 text-white py-1 px-2 rounded-full">{product.category}</p>
              </div>

              <p className="text-gray-600 text-lg mb-4">
                Rp {parseInt(product.price, 10).toLocaleString("id-ID")}
              </p>
              <div className="flex justify-between items-center">
                {/* Button untuk menampilkan detail produk */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200 w-full mr-2"
                >
                  Detail
                </button>
                {/* Icon keranjang untuk menambahkan ke keranjang */}
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-200"
                >
                  <FaCartPlus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ">
          <div className="bg-white w-96 lg:w-1/2 lg:h-3/4 p-6 rounded-lg shadow-lg relative">
            <img
              src={selectedProduct.image || defaultImage}
              alt={selectedProduct.name}
              className="w-full h-48 lg:h-1/2 object-cover my-4 rounded"
              onError={(e) => (e.target.src = defaultImage)}
            />
            <h2 className="text-2xl font-bold ">{selectedProduct.name}</h2>
            <div className="flex justify-between items-center my-2">
              <p className="text-xs w-fit bg-rose-600 text-white py-1 px-2 rounded-full">{selectedProduct.category}</p>
              <p className="text-gray-600 text-xl">
                Harga:{" "}
                <span className="font-bold text-black">
                  Rp {parseInt(selectedProduct.price, 10).toLocaleString("id-ID")}
                </span>
              </p>
            </div>
            <h3 className="font-semibold">Deskripsi Produk</h3>
            <p className="text-gray-600 h-32 overflow-y-auto">
              {selectedProduct.description || "Deskripsi tidak tersedia."}
            </p>
            <div className="flex justify-center items-end mt-5">
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null); // Tutup modal setelah menambahkan ke keranjang
                }}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-200"
              >
                Tambah ke Keranjang
              </button>
            </div>
            {/* Close Modal */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
