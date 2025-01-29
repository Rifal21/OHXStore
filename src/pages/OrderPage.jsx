import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();  // Ganti useHistory dengan useNavigate
  const { products, total } = location.state || { products: [], total: 0 };

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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Struk Pemesanan", 20, 20);
    doc.text(`Nama: ${formData.name}`, 20, 30);
    doc.text(`Email: ${formData.email}`, 20, 40);
    doc.text(`Nomor HP: ${formData.phone}`, 20, 50);
    doc.text(`Briefing: ${formData.briefing}`, 20, 60);

    let yPosition = 70;
    products.forEach((product) => {
      doc.text(`${product.name} - Jumlah: ${product.quantity}`, 20, yPosition);
      doc.text(`Harga: Rp ${product.price.toLocaleString("id-ID")}`, 120, yPosition);
      yPosition += 10;
    });

    doc.text(`Total Harga: Rp ${total.toLocaleString("id-ID")}`, 20, yPosition);

    doc.save("struk_pemesanan.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: "Mengirim Pesanan...",
      html: "Tunggu sebentar...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const apiURL = import.meta.env.VITE_API_URL;
  
      // Ambil hanya nama, quantity, dan harga dari produk
      const simplifiedProducts = formData.products.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        total: product.quantity * product.price,
      }));
  
      // Format data untuk dikirim
      const payload = {
        date: new Date().toLocaleString('id-ID'),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        briefing: formData.briefing,
        products: simplifiedProducts,
        total: total,
        payment: formData.payment,
        status: "Pending",
      };
  
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Pesanan Berhasil Dikirim",
          text: "Pesanan Anda telah berhasil dikirim.",
        });
  
        navigate("/my-transaction", {
          state: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            briefing: formData.briefing,
            products: simplifiedProducts,
            total,
            date: new Date().toLocaleString('id-ID'),
            payment: formData.payment,
          },
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Silakan coba lagi.",
      });
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
        <div className="">
            <label className="block font-medium mb-2">Pembayaran</label>
            <select
                    name="payment"
                    className="w-full border rounded p-2"
                    value={formData.payment}
                    onChange={handleChange}
                    required
            >
                    <option value="">Pilih Metode Pembayaran</option>
                    <option value="Transfer Bank BNI">Transfer Bank</option>
                    <option value="Dana">Dana</option>
                  </select>
                </div>
            <input type="hidden" name="status" value={formData.status} />
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
