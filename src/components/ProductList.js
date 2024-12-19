import React, { useState, useEffect } from "react";
import Product from "./Product";
import Cart from "./Cart"; 
import Header from "./Header";
import Banner from "./Banner"; 
import "../App.css"; 

const ProductList = () => {
    // Data banner
    const banners = [
        { id: 1, url: "/image/banner1.jpg" },
        { id: 2, url: "/image/banner2.jpg" },
        { id: 3, url: "/image/banner3.jpg" },
    ];

    const [product, setProducts] = useState([]); // State untuk menyimpan daftar produk
    const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata kunci pencarian
    const [selectedCategory, setSelectedCategory] = useState("All"); // State untuk kategori yang dipilih
    const apiUrl = process.env.REACT_APP_API_URL; // URL API untuk mengambil data produk
    const [loading, setLoading] = useState(true); // State untuk menandakan apakah data sedang dimuat

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
                const response = await fetch(`${apiUrl}/products`); // Mengambil data produk dari API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Mengonversi response ke JSON
                setProducts(data); // Menyimpan data produk ke state
            } catch (error) {
                console.error("Error fetching products:", error); // Menangani error jika fetch gagal
            } finally {
                setLoading(false); // Set loading ke false setelah fetch selesai
            }
        };

        fetchProducts(); // Memanggil fungsi fetchProducts
    }, [apiUrl]); // Dependency array untuk menjalankan efek saat apiUrl berubah

    // Filter produk berdasarkan kategori yang dipilih dan pencarian
    const filteredProducts = product.filter((prod) => {
        const matchesCategory =
            selectedCategory === "All" ||
            prod.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = prod.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch; // Mengembalikan produk yang sesuai dengan kategori dan pencarian
    });

    // Kelompokkan produk berdasarkan kategori
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const category = product.category || "Lainnya"; // Jika kategori tidak ada, gunakan "Lainnya"
        if (!acc[category]) {
            acc[category] = []; // Inisialisasi array untuk kategori baru
        }
        acc[category].push(product); // Tambahkan produk ke kategori yang sesuai
        return acc;
    }, {});

    // Filter produk berdasarkan judul
    const filteredProduct = Object.keys(groupedProducts).reduce(
        (acc, category) => {
            const filteredItems = groupedProducts[category].filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()), // Filter berdasarkan judul
            );
            if (filteredItems.length > 0) {
                acc[category] = filteredItems; // Tambahkan kategori jika ada produk yang sesuai
            }
            return acc;
        },
        {},
    );

    // Fungsi untuk menangani pencarian
    const handleSearch = (term) => {
        setSearchTerm(term); // Update state searchTerm dengan nilai baru
    };

    // Fungsi untuk menangani pemilihan kategori
    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // Update state selectedCategory dengan kategori yang dipilih
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
            <h1 className="text-xl font-semibold uppercase mb - 4">Categories</h1>
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
            {/* Input search */}
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
                <p className="text-center font-semibold">Product not found</p>
            )}
            {/* <Cart /> */}
        </div>
    );
};

export default ProductList; // Ekspor komponen ProductList untuk digunakan di bagian lain aplikasi