import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice"; // Import action untuk menambahkan produk ke keranjang
import Swal from "sweetalert2"; // Import SweetAlert untuk notifikasi
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product }) => {
    const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari Redux
    const navigate = useNavigate(); // Mendapatkan fungsi navigate untuk routing

    // Mengambil status login dari Redux
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // State untuk menyimpan stok yang tersedia dan kuantitas produk
    const [availableStock, setAvailableStock] = useState(
        product.availableStock || 20, // Set stok awal dari props atau default 20
    );

    const [quantity, setQuantity] = useState(1); // Inisialisasi kuantitas dengan 1

    useEffect(() => {
        // Ambil jumlah stok terakhir dari localStorage
        const storedStock = localStorage.getItem(`stock_${product.id}`);
        if (storedStock !== null) {
            // Periksa apakah storedStock tidak null
            try {
                const parsedStock = JSON.parse(storedStock); // Parsing stok dari localStorage
                setAvailableStock(parsedStock); // Set stok yang tersedia
            } catch (error) {
                console.error("Error parsing stored stock:", error);
                setAvailableStock(product.availableStock || 20); // Set ke default jika parsing gagal
            }
        } else {
            setAvailableStock(product.availableStock || 20); // Set stok default jika tidak ada di localStorage
        }
    }, [product.id, product.availableStock]); // Dependency array untuk menjalankan efek saat id atau availableStock berubah

    const handleAddToCart = () => {
        // Cek apakah pengguna sudah login
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
                    navigate("/login"); // Arahkan ke halaman login jika belum login
                }
            });
            return; // Hentikan eksekusi jika belum login
        }

        // Cek apakah kuantitas yang ingin ditambahkan melebihi stok yang tersedia
        if (quantity <= availableStock) {
            // Dispatch action untuk menambahkan produk ke keranjang
            dispatch(
                addToCart({
                    image: product.image,
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: quantity,
                }),
            );
            // Update availableStock dan lastStock
            const newAvailableStock = availableStock - quantity; // Kurangi stok yang tersedia
            setAvailableStock(newAvailableStock); // Update state stok yang tersedia
            localStorage.setItem(
                `stock_${product.id}`,
                JSON.stringify(availableStock - quantity), // Simpan stok yang baru di localStorage
            );

            // Tampilkan notifikasi sukses
            Swal.fire({
                title: "Success!",
                text: "Product successfully added to the cart",
                icon: "success",
                confirmButtonText: "OK",
            });
        } else {
            // Tampilkan notifikasi jika stok tidak mencukupi
            Swal.fire({
                title: "Insufficient Stock!",
                text: "The quantity you want to add exceeds the available stock.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="border bg-white rounded-lg p-4 shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
                src={product.image}
                alt={product.title} // Menampilkan gambar produk
                className="w-full h-36 object-contain"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                    {product.title} {/* Menampilkan judul produk */}
                </h2>
                <p className="text-l font-semibold mt-2 text-gray-700">
                    Price: ${product.price} {/* Menampilkan harga produk */}
                </p>
                <p className="text-gray-700">
                    Stock: {availableStock}{" "}
                    {/* Menampilkan stok yang tersedia */}
                </p>
                <div className="flex flex-col gap-0">
                    <Link to={`/products/${product.id}`}>
                        <button className="w-full mt-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="mr-2"
                            />
                            Detail Product{" "}
                            {/* Tombol untuk melihat detail produk */}
                        </button>
                    </Link>
                    <button
                        onClick={handleAddToCart} // Menangani penambahan produk ke keranjang
                        className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                        <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                        Add to Cart{" "}
                        {/* Tombol untuk menambahkan produk ke keranjang */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product; 
