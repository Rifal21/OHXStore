import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

function MyTransaction() {
  const location = useLocation();
  const { name, email, phone, briefing, products = [], total, date } = location.state || {};

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Struk Pemesanan", 20, 20);
    doc.text(`Nama: ${name}`, 20, 30);
    doc.text(`Email: ${email}`, 20, 40);
    doc.text(`Nomor HP: ${phone}`, 20, 50);
    doc.text(`Briefing: ${briefing}`, 20, 60);
    doc.text(`Tanggal Pemesanan: ${date}`, 20, 70);

    let yPosition = 80;
    products.forEach((product) => {
      doc.text(`${product.name} - Jumlah: ${product.quantity}`, 20, yPosition);
      doc.text(`Harga: Rp ${product.price.toLocaleString("id-ID")}`, 120, yPosition);
      yPosition += 10;
    });

    doc.text(`Total Harga: Rp ${total.toLocaleString("id-ID")}`, 20, yPosition);

    doc.save("struk_pemesanan.pdf");
  };

  // Check if the necessary data exists before rendering
  if (!name || !email || !phone || !products.length || total === undefined) {
    return <div>Data transaksi tidak ditemukan. Pastikan Anda sudah memesan produk terlebih dahulu.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Struk Pemesanan</h1>
      <div className="space-y-4">
        <div>
          <p className="font-medium">Nama: {name}</p>
          <p>Email: {email}</p>
          <p>Nomor HP: {phone}</p>
          <p>Briefing: {briefing}</p>
          <p>Tanggal Pemesanan: {new Date(date).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Produk yang Dipesan</h3>
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
        <div>
          {/* Button untuk mendownload PDF */}
          <button
            onClick={generatePDF}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Unduh Struk PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyTransaction;
