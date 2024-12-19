import React, { useState, useEffect } from "react";
import Product from "./Product";
import Cart from "./Cart";
import Header from "./Header";
import Banner from "./Banner";
import "../App.css";

const ProductList = () => {
    // data banner
    const banners = [
        { id: 1, url: "/image/banner1.jpg" },
        { id: 2, url: "/image/banner2.jpg" },
        { id: 3, url: "/image/banner3.jpg" },
    ];

    const [product, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All"); // State untuk kategori yang dipilih
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);

    // Daftar kategori yang tersedia
    const categories = [
        "All",
        "Electronics",
        "Jewelery",
        "Men's Clothing",
        "Women's Clothing",
    ];

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

    // Filter produk berdasarkan kategori yang dipilih dan pencarian
    const filteredProducts = product.filter((prod) => {
        const matchesCategory =
            selectedCategory === "All" ||
            prod.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = prod.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });


    // produk bedasarkan kategori
    const groupedProducts = filteredProducts.reduce((acc, product) => {
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

    // Fungsi untuk menangani pemilihan kategori
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Menampilkan loading saat data belum tersedia
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>{" "}
                {/* Spinner atau animasi loading */}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 mt-16">
            {/* Banner Section */}
            <Banner banners={banners} /> {/* Menggunakan komponen Banner */}
            <h1 className="text-xl font-semibold uppercase mb-4">Categories</h1>
            {/* Kategori Buttons */}
            <div className="mb-4 flex justify-center">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`mr-2 px-4 py-2 rounded mb-8 ${
                            selectedCategory === category
                                ? "bg-blue-700 text-white"
                                : "bg-gray-200"
                        }`}>
                        {category}
                    </button>
                ))}
            </div>
            {/* input search */}
            <Header onSearch={handleSearch} />
            {Object.keys(filteredProduct).length > 0 ? (
                Object.keys(filteredProduct).map((category) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-l text-transform: uppercase font-semibold my-2">
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredProduct[category].map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>Product not found</p>
            )}
            {/* <Cart /> */}
        </div>
    );
};

export default ProductList;
