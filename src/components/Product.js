import React, { useState } from "react";
import { Link } from "react-router-dom"; // Pastikan ini diimpor dari 'react-router-dom'
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice"; // Import addToCart action

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const [availableStock, setAvailableStock] = useState(
        product.availableStock || 20
    );

    const handleAddToCart = () => {
        if (availableStock > 0) {
            dispatch(
                addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                })
            );
            setAvailableStock(availableStock - 1);
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
