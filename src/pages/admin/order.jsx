import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaPlusCircle, FaSave, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const AdminOrder = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
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
      <h1 className="text-3xl font-bold mb-6 text-center">Kelola Pesanan</h1>
      

      {/* Daftar Produk */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 ">Tanggal Pemesanan</th>
              <th className="py-3 px-4 ">Nama Pemesan</th>
              <th className="py-3 px-4 ">Email</th>
              <th className="py-3 px-4 ">Nomor Telepon</th>
              <th className="py-3 px-4 ">Permintaan</th>
              <th className="py-3 px-4 ">Produk</th>
              <th className="py-3 px-4 ">Pembayaran</th>
              <th className="py-3 px-4 ">Status</th>
              <th className="py-3 px-4 ">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="py-3 px-4 ">{product.date}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {
                    product.name
                  }
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={product.email}
                      onChange={(e) => handleEditInputChange(index, "email", e.target.value)}
                      className=" p-1 rounded"
                    />
                  ) : (
                    product.email
                  )}
                </th>
                <td className="py-3 px-4 ">
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={product.phone}
                      onChange={(e) => handleEditInputChange(index, "phone", e.target.value)}
                      className=" p-1 rounded"
                    />
                  ) : (
                    product.phone
                  )}
                </td>
                <td className="py-3 px-4 ">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={product.briefing}
                      onChange={(e) => handleEditInputChange(index, "briefing", e.target.value)}
                      className=" p-1 rounded"
                    />
                  ) : (
                    product.briefing
                  )}
                </td>
                <td className="py-3 px-4 ">
                    {
                      JSON.parse(product.products).map((p, i) => (
                        <div key={i}>
                          <p>Nama: {p.name}</p>
                          <p>Jumlah: {p.quantity}</p>
                          <p>Harga: Rp {p.price.toLocaleString("id-ID")}</p>
                          <p>Total Harga: Rp {p.total.toLocaleString("id-ID")}</p>
                        </div>
                      ))
                  }
                  </td>

                <td className="py-3 px-4 ">{editIndex === index ?                     <select
                      value={product.payment}
                      onChange={(e) => handleEditInputChange(index, "payment", e.target.value)}
                      className="p-1 rounded border w-full"
                    >
                      <option value="Transfer Bank">Transfer Bank</option>
                      <option value="Dana">Dana</option>
                    </select> : product.payment}</td>
                <td className={`py-3 px-4 ${
                  product.status === "Pending"
                    ? "text-yellow-500 font-bold"
                    : product.status === "Selesai"
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }`}>
                  {editIndex === index ? (
                    <select
                      value={product.status}
                      onChange={(e) => handleEditInputChange(index, "status", e.target.value)}
                      className="p-1 rounded border w-full"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Batal">Batal</option>
                    </select>
                  ) : (
                    product.status
                  )}
                </td>
                <td className="py-3 px-4">
                  {editIndex === index ? (
                    <button
                      onClick={() => saveEdit(index)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mb-2"
                    >
                      <FaSave size={16} className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 mb-2"
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

export default AdminOrder;
