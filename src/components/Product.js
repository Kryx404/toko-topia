import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
     <img src={product.image} alt={product.title} className="w-full h-64 object-contain" />
      <div className="px-6 py-4">
        <h2 className="font-bold text-lg">{product.title}</h2>
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-700 text-base">Harga: {product.price}</p>
      </div>
    </div>
  );
};

export default Product;