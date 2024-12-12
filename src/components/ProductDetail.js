import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Mengambil id produk dari URL
  const [product, setProduct] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/${id}`);

        // Periksa apakah respons berhasil
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Ambil data produk
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id, apiUrl]);

  if (!product) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum tersedia
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-64 object-contain" />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-700 text-base">Harga: {product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;