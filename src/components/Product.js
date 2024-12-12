import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p className="text-gray-700">Harga: ${product.price}</p>
      <Link to={`/products/${product.id}`}>
        <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
          Lihat Detail
        </button>
      </Link>
    </div>
  );
};

export default Product;