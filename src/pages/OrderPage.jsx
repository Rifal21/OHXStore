import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";

function OrderPage() {
  const location = useLocation(); // Ambil data dari state
  const { products, total } = location.state || { products: [], total: 0 }; // Default jika state kosong

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    briefing: "",
    products,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const spreadsheetId = import.meta.env.VITE_SHEET_ID;
  //     const apiKey = import.meta.env.VITE_API_KEY;
  //     const range = "Sheet1!A:F"; // Sesuaikan dengan nama sheet dan kolom Anda

  //     const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

  //     // Format data yang akan dikirim
  //     const values = [
  //       [
  //         formData.name,
  //         formData.email,
  //         formData.phone,
  //         formData.briefing,
  //         JSON.stringify(formData.products),
  //         new Date().toLocaleString(),
  //       ],
  //     ];

  //     // Kirim data ke Google Sheets
  //     await axios.post(
  //       url,
  //       { values },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     alert("Pesanan berhasil dikirim!");
  //     setFormData({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       briefing: "",
  //       products: [],
  //     });
  //   } catch (error) {
  //     console.error("Error submitting order:", error);
  //     alert("Terjadi kesalahan. Silakan coba lagi nanti.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const scriptURL = import.meta.env.VITE_URL_SCRIPT; // Ganti dengan URL Web App Anda
      const response = await axios.post(scriptURL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.status === "success") {
        alert("Pesanan berhasil dikirim!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          briefing: "",
          products: [],
        });
      } else {
        throw new Error(response.data.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Halaman Pemesanan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Nomor HP</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Briefing</label>
          <textarea
            name="briefing"
            value={formData.briefing}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
            rows="4"
          ></textarea>
        </div>
        <div>
          <h3 className="font-medium mb-2">Produk yang Dipilih</h3>
          <ul className="space-y-2">
            {products.map((product, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-bold">{product.name}</p>
                <p>Jumlah: {product.quantity}</p>
                <p>Harga: Rp {product.price.toLocaleString("id-ID")}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-lg font-bold">
            Total Harga: Rp {total.toLocaleString("id-ID")}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Kirim Pesanan
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
