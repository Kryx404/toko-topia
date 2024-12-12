import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);

        // Periksa apakah respons berhasil
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Periksa apakah respons memiliki konten
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Daftar Produk</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;