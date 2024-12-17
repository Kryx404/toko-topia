import React, { useState, useEffect } from "react";
import Product from "./Product";
import Cart from "./Cart";
import Header from './Header';

const ProductList = () => {
    const [product, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Daftar Produk</h1>
            <Header onSearch={handleSearch}/>
           
            {Object.keys(filteredProduct).length > 0 ? (
                Object.keys(filteredProduct).map((category) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-2xl font-semibold">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProduct[category].map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>Produk tidak ditemukan</p>
            )}
            <Cart />
        </div>
    );
};

export default ProductList;
