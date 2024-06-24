import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Oops! 🤔</h1>
        <p className="text-gray-700">
          La ruta a la que intenta acceder no existe ✖️
        </p>
      </div>
    </div>
  );
}
