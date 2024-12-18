import React, { useState, useEffect } from "react";
import Product from "./Product";
import Cart from "./Cart";
import Header from './Header';
import '../App.css';

const ProductList = () => {
    const [product, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading ke true saat mulai fetch
            try {
                const response = await fetch(`${apiUrl}/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Set loading ke false setelah fetch selesai
            }
        };

        fetchProducts();
    }, [apiUrl]);

    // produk bedasarkan kategori
    const groupedProducts = product.reduce((acc, product) => {
        const category = product.category || "Lainnya";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    // search product
    const filteredProduct = Object.keys(groupedProducts).reduce(
        (acc, category) => {
            const filteredItems = groupedProducts[category].filter((product) =>
                // filter bedasarkan judul
                product.title.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            if (filteredItems.length > 0) {
                acc[category] = filteredItems;
            }
            return acc; 
        },
        {},
    );

      // Fungsi untuk menangani pencarian
      const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Menampilkan loading saat data belum tersedia
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div> {/* Spinner atau animasi loading */}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 mt-16">
          <h1 className="text-3xl font-bold">Daftar Produk</h1>
            <Header onSearch={handleSearch}/>
           
            {Object.keys(filteredProduct).length > 0 ? (
                Object.keys(filteredProduct).map((category) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-l text-transform: uppercase font-semibold my-2">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredProduct[category].map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>Produk tidak ditemukan</p>
            )}
            {/* <Cart /> */}
        </div>
    );
};

export default ProductList;
