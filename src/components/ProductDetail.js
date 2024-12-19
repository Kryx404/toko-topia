import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Swal from "sweetalert2";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Product from "./Product";

// Fungsi komponen ProductDetail
const ProductDetail = () => {
    // Mengambil id produk dari URL
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const apiUrl = process.env.REACT_APP_API_URL; // Pastikan ini diatur dengan benar

    // State untuk produk, quantity, stok, loading, dan produk terkait
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Inisialisasi quantity dengan 1
    const [availableStock, setAvailableStock] = useState(0);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]); // State untuk produk terkait

    // Fungsi untuk mengambil detail produk dan produk terkait
    useEffect(() => {
        const fetchProductDetail = async () => {
            setLoading(true);
            try {
                // Ambil stok dari localStorage terlebih dahulu
                const storedStock = localStorage.getItem(`stock_${id}`);
                if (storedStock) {
                    setAvailableStock(JSON.parse(storedStock));
                } else {
                    setAvailableStock(20); // Set default jika tidak ada
                }

                // Ambil detail produk dari API
                const response = await fetch(`${apiUrl}/products/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
                setQuantity(Math.min(20, data.availableStock || 1));

                // Ambil produk terkait berdasarkan kategori yang sama
                const relatedResponse = await fetch(
                    `${apiUrl}/products/category/${data.category}`,
                );
                if (!relatedResponse.ok) {
                    throw new Error(
                        `HTTP error! status: ${relatedResponse.status}`,
                    );
                }
                const relatedData = await relatedResponse.json();

                // Filter produk yang sama dengan produk yang sedang dilihat
                const filteredRelatedProducts = relatedData.filter(
                    (item) => item.id !== data.id,
                );
                setRelatedProducts(filteredRelatedProducts);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0); // Scroll ke atas setelah data diambil
            }
        };

        fetchProductDetail();
    }, [id, apiUrl]);

    // Fungsi untuk menambahkan produk ke keranjang
    const handleAddToCart = () => {
        if (!isLoggedIn) {
            Swal.fire({
                title: "Warning!",
                text: "You must log in first to make a purchase",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Login",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }

        if (product && quantity > availableStock) {
            Swal.fire({
                title: "Insufficient Stock!",
                text:
                    "Product stock is only available " +
                    product.availableStock +
                    " pieces.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        // Tambahkan produk ke keranjang
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: quantity,
            }),
        );

        // Update localStorage
        const newAvailableStock = availableStock - quantity;
        if (newAvailableStock >= 0) {
            // Pastikan stok tidak menjadi negatif
            setAvailableStock(newAvailableStock);
            localStorage.setItem(
                `stock_${product.id}`,
                JSON.stringify(newAvailableStock),
            );
        }

        Swal.fire({
            title: "Success!",
            text: "Product successfully added to the cart",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    // Fungsi untuk mengubah quantity
    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= availableStock) {
            setQuantity(value);
        } else if (value < 1) {
            setQuantity(1); // Set minimum quantity to 1
        } else {
            setQuantity(availableStock); // Set to available stock if exceeds
        }
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
        <div className="container mx-auto p-4 mt-32 h-full">
            <div className="flex flex-col md:flex-row">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full md:w-1/2 h-64 object-contain mb-8 md:mb-0"
                />
                <div className="md:ml-4">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-700 text-base mb-4">
                        {product.description}
                    </p>
                    <p className="text-lg font-semibold mb-4">
                        Remaining Stock: {availableStock} Pieces
                    </p>
                    <div className="flex items-center mb-4">
                        <label className="mr-2"> Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="border rounded w-20 py-2 px-3"
                            min="1"
                            max={availableStock || 1}
                        />
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="mt-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200">
                        <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
            {/* Tampilkan produk terkait */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <Product
                                key={relatedProduct.id}
                                product={relatedProduct}
                            />
                        ))
                    ) : (
                        <p>Product Not Found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
