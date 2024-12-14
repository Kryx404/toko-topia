import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const { id } = useParams(); // Mengambil id produk dari URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const apiUrl = process.env.REACT_APP_API_URL; // Pastikan ini diatur dengan benar
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Inisialisasi quantity dengan 1
    const [availableStock, setAvailableStock] = useState(0);

    useEffect(() => {
        const fetchProductDetail = async () => {
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
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };

        fetchProductDetail();
    }, [id, apiUrl]);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            Swal.fire({
                title: "Peringatan!",
                text: "Anda harus login terlebih dahulu untuk melakukan pembelian",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Login",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }

        if (product && quantity > availableStock) {
            Swal.fire({
                title: "Stok Tidak Cukup!",
                text:
                    "Stok produk hanya tersedia " +
                    product.availableStock +
                    " buah.",
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
if (newAvailableStock >= 0) { // Pastikan stok tidak menjadi negatif
    setAvailableStock(newAvailableStock);
    localStorage.setItem(`stock_${product.id}`, JSON.stringify(newAvailableStock));
}

        Swal.fire({
            title: "Berhasil!",
            text: "Produk berhasil ditambahkan ke keranjang",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

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

    if (!product) {
        return <div>Loading...</div>; // Menampilkan loading saat data belum tersedia
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-contain"
            />
            <div className="px-6 py-4">
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-lg font-semibold">Sisa Stok: {availableStock} buah</p>
                <div className="flex items-center mt-4">
                    <label className="mr-2">Jumlah:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange }
                        className="border rounded w-20 py-2 px-3"
                        min="1"
                        max={availableStock || 1}
                    />
                </div>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Tambah ke Keranjang
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
