import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const email = import.meta.env.VITE_EMAIL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (username !== import.meta.env.VITE_USERNAME || email !== import.meta.env.VITE_EMAIL) {
        throw new Error("Username atau Email tidak valid");
      } else if (password !== import.meta.env.VITE_PASSWORD) {
        throw new Error("Password tidak valid");
      } else {
        localStorage.setItem("user", JSON.stringify({ username, password, email }));

        // Sweet Alert untuk sukses login
        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: "Anda akan diarahkan ke halaman produk.",
          confirmButtonColor: "#38a169",
        }).then(() => {
          navigate("/admin/product");
        });
      }
    } catch (error) {
      // Sweet Alert untuk error
      Swal.fire({
        icon: "error",
        title: "Login Gagal!",
        text: error.message,
        confirmButtonColor: "#e53e3e",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        {/* Bagian Kiri: Logo dan Slogan */}
        <div className="p-8 bg-green-400 text-white flex flex-col justify-center items-center">
          <img
            src="../image/logo.png"
            alt="Logo"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">OHXStore</h1>
          <p className="text-lg font-light">Solusi Cerdas Untuk Kebutuhan Digital</p>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Login</h1>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Username atau Email</span>
              <input
                type="text"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username atau email"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
