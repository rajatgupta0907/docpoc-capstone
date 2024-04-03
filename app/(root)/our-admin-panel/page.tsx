"use client";
import React, { useState } from "react";



export default function Page() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dummy authentication, replace with your actual authentication logic
    if (username === "admin" && password === "password") {
      // Redirect to somewhere upon successful login
      window.location.href = "/our-admin-dashboard";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
    
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border text-black rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none text-black focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600  text-black focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>

          
          
    </>
  );
}
