import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice"; // Import addToCart action
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [availableStock, setAvailableStock] = useState(
        product.availableStock || 20,
    );

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Ambil jumlah stok terakhir dari localStorage
        const storedStock = localStorage.getItem(`stock_${product.id}`);
        if (storedStock !== null) {
            // Periksa apakah storedStock tidak null
            try {
                const parsedStock = JSON.parse(storedStock);
                setAvailableStock(parsedStock);
            } catch (error) {
                console.error("Error parsing stored stock:", error);
                setAvailableStock(product.availableStock || 20); // Set ke default jika parsing gagal
            }
        } else {
            setAvailableStock(product.availableStock || 20);
        }
    }, [product.id, product.availableStock]);

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

        if (quantity <= availableStock) {
            dispatch(
                addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: quantity,
                }),
            );
            // Update availableStock dan lastStock
            const newAvailableStock = availableStock - quantity;
            setAvailableStock(newAvailableStock);
            localStorage.setItem(
                `stock_${product.id}`,
                JSON.stringify(availableStock - quantity),
            );

            Swal.fire({
                title: "Berhasil!",
                text: "Produk berhasil ditambahkan ke keranjang",
                icon: "success",
                confirmButtonText: "OK",
            });
        } else {
            Swal.fire({
                title: "Stok Tidak Cukup!",
                text: "Jumlah yang ingin Anda tambahkan melebihi stok yang tersedia.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="border bg-white rounded-lg p-4 shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-36 object-contain"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-l font-semibold mt-2 text-gray-700">
                    Harga: ${product.price}
                </p>
                <p className="text-gray-700">Stok: {availableStock}</p>
                <div className="flex flex-col gap-0">
                <Link to={`/products/${product.id}`}>
                    <button className="w-full mt-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
                    <FontAwesomeIcon icon={faCircleInfo} className="mr-2"/>
                        Lihat Detail
                    </button>
                </Link>
                <button
                    onClick={handleAddToCart}
                    className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                    <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                    Add to Cart
                </button>
                </div>
            </div>
        </div>
    );
};
export default Product;
