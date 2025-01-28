import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
      {cart.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p>{product.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-black py-1 px-4 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
