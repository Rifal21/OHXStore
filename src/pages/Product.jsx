import React from "react";
import { useCart } from "../context/CartContext";
import Web from "../images/web-project-2.jpg";
import Mobile2 from "../images/mobile-project-2.jpg";
import Mobile1 from "../images/mobile-project-1.jpg";

function Product() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Produk 1", price: 50000, image: Web },
    { id: 2, name: "Produk 2", price: 75000, image: Mobile1 },
    { id: 3, name: "Produk 3", price: 100000, image: Mobile2 },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Produk Kami</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
              onError={(e) => e.target.src = "/path/to/default-image.jpg"} // Gambar fallback
            />
            <div className="p-4">
              <h2 className="font-semibold text-xl mb-2">{product.name}</h2>
              <p className="text-gray-600 text-lg mb-4">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-700 transition-all duration-200"
              >
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
