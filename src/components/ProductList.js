import React, { useState, useEffect } from 'react';
import Product from './Product';
import Cart from './Cart';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/products`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Daftar Produk</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Cart/>
    </div>
  );
};

export default ProductList;