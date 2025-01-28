import React from "react";

function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-green-500 text-white rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Selamat Datang di Toko Kami</h1>
        <p className="text-lg">Belanja sekarang dan temukan produk terbaik!</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Kategori Produk</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Elektronik", "Fashion", "Kecantikan", "Makanan"].map(
            (category, index) => (
              <div
                key={index}
                className="bg-gray-100 border rounded-lg p-4 text-center hover:shadow-lg"
              >
                {category}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
