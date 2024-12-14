import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice"; // Import addToCart action
import Swal from "sweetalert2";

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [availableStock, setAvailableStock] = useState(
        product.availableStock || 20
    );

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Ambil jumlah stok terakhir dari localStorage
        const storedStock = localStorage.getItem(`stock_${product.id}`);
        if (storedStock) {
            setAvailableStock(JSON.parse(storedStock));
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
                })
            );
            // Update availableStock dan lastStock
            const newAvailableStock = availableStock - quantity;
            setAvailableStock(newAvailableStock);
            localStorage.setItem(
                `stock_${product.id}`,
                JSON.stringify(availableStock - quantity)
            );
        } else {
            alert("Stok Tidak Cukup!");
        }
    };

    return (
        <div className="border rounded-lg p-4">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain"
            />
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-gray-700">Harga: ${product.price}</p>
            <p className="text-gray-700">Stok: {availableStock}</p>
            <Link to={`/products/${product.id}`}>
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
                    Lihat Detail
                </button>
            </Link>
            <button
                onClick={handleAddToCart}
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
};
export default Product;
