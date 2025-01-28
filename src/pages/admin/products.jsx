import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaPlusCircle, FaSave, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_PRODUCT_URL;

const AdminProduk = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}?_format=index`);
      setProducts(Object.keys(response.data).map((key) => response.data[key]));
    } catch (error) {
      Swal.fire("Error", "Gagal mengambil data produk", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.description ||
      !newProduct.category
    ) {
      Swal.fire("Peringatan", "Harap isi semua data produk", "warning");
      return;
    }

    try {
      await axios.post(API_URL, [newProduct]);
      Swal.fire("Berhasil", "Produk berhasil ditambahkan", "success");
      setNewProduct({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
      fetchProducts();
    } catch (error) {
      Swal.fire("Error", "Gagal menambahkan produk", "error");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const saveEdit = async (index) => {
    try {
      const updatedProduct = products[index];
      console.log(updatedProduct);
      await axios.put(`${API_URL}/${index}`, updatedProduct);
      Swal.fire("Berhasil", "Produk berhasil diperbarui", "success");
      setEditIndex(null);
      fetchProducts();
    } catch (error) {
      Swal.fire("Error", "Gagal memperbarui produk", "error");
    }
  };

  const handleEditInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const deleteProduct = async (index) => {
    Swal.fire({
      title: "Anda yakin?",
      text: "Produk yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${index}`);
          Swal.fire("Berhasil", "Produk berhasil dihapus", "success");
          fetchProducts();
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus produk", "error");
        }
      }
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Kelola Produk</h1>
      <div className="flex justify-between items-center  space-x-4">
        <h2 className="text-2xl font-semibold">Tambah Produk</h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded-full"
          onClick={() => setIsOpen(!isOpen)} // Toggle form visibility
        >
          <FaPlus size={20} />
        </button>
      </div>
      
      {/* Animate the form's appearance */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md mb-3 overflow-hidden"
      >
        <form onSubmit={addProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Nama Produk"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Harga Produk"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="URL Gambar Produk"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Deskripsi Produk"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Kategori Produk"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4 w-full">
            Tambah Produk
          </button>
        </form>
      </motion.div>

      {/* Daftar Produk */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 ">Nama Produk</th>
              <th className="py-3 px-4 ">Harga Produk</th>
              <th className="py-3 px-4 ">Gambar</th>
              <th className="py-3 px-4 ">Deskripsi</th>
              <th className="py-3 px-4 ">Kategori</th>
              <th className="py-3 px-4 ">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleEditInputChange(index, "name", e.target.value)}
                      className=" p-1 rounded"
                    />
                  ) : (
                    product.name
                  )}
                </th>
                <td className="py-3 px-4 ">
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => handleEditInputChange(index, "price", e.target.value)}
                      className=" p-1 rounded"
                    />
                  ) : (
                    formatCurrency(product.price)
                  )}
                </td>
                <td className="py-3 px-4 ">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={product.image}
                      onChange={(e) => handleEditInputChange(index, "image", e.target.value)}
                      className=" p-1 rounded"
                    />
                  ) : (
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                  )}
                </td>
                <td className="py-3 px-4 ">{editIndex === index ? <input type="text" value={product.description} onChange={(e) => handleEditInputChange(index, "description", e.target.value)} className=" p-1 rounded" /> : product.description}</td>
                <td className="py-3 px-4 ">{editIndex === index ? <input type="text" value={product.category} onChange={(e) => handleEditInputChange(index, "category", e.target.value)} className=" p-1 rounded" /> : product.category}</td>
                <td className="py-3 px-4  flex space-x-2">
                  {editIndex === index ? (
                    <button
                      onClick={() => saveEdit(index)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                    >
                      <FaSave size={16} className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                    >
                      <FaEdit size={16} className="text-white" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteProduct(index)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <FaTrash size={16} className="text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={indexOfLastProduct >= products.length}
          onClick={() => paginate(currentPage + 1)}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProduk;
