import React, { useState } from "react";
import { FaShoppingCart, FaTimes , FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function FloatingCart() {
  const { cart, updateQuantity, removeFromCart } = useCart(); // Menggunakan removeFromCart
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Inisialisasi navigate

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Kirim data keranjang ke halaman order
    navigate("/order", {
      state: {
        products: cart,
        total: calculateTotal(),
      },
    });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Tombol Icon Keranjang atau Close */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 relative`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaShoppingCart size={24} />}
        {!isOpen && cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      {/* Modal Keranjang */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg border rounded-lg p-6 w-96 relative">
            <h3 className="font-bold text-lg mb-4 text-center">Keranjang Anda</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">Keranjang kosong</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Tombol Kurangi Qty */}
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                        }
                        className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      {/* Qty */}
                      <p className="font-bold">{item.quantity}</p>
                      {/* Tombol Tambah Qty */}
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      {/* Tombol Hapus Item */}
                      <button
                        onClick={() => removeFromCart(item.id)} // Panggil fungsi removeFromCart
                        className="text-red-500 hover:text-red-600 ml-4"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <div className="mt-6">
                {/* Tombol Checkout */}
                <button
                  onClick={handleCheckout} // Panggil fungsi handleCheckout
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg text-lg font-bold shadow-md hover:from-green-600 hover:to-green-700"
                >
                  Lanjutkan ke Halaman Pemesanan
                </button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Total:{" "}
                  <span className="font-bold text-black">
                    Rp {calculateTotal().toLocaleString("id-ID")}
                  </span>
                </p>
              </div>
            )}
            {/* Tombol Tutup di Kanan Atas */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingCart;
