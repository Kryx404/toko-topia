import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice"; // Pastikan Anda memiliki action ini

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (item, newQuantity) => {
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    };

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item.id));
        // Update stok di localStorage saat item dihapus
        const storedStock = localStorage.getItem(`stock_${item.id}`);
        if (storedStock) {
            const availableStock = JSON.parse(storedStock);
            const newAvailableStock = availableStock + item.quantity; // Kembalikan jumlah yang dihapus ke stok
            localStorage.setItem(
                `stock_${item.id}`,
                JSON.stringify(newAvailableStock),
            );
        }
    };

    const handleCheckout = () => {
        let stockSufficient = true;

        cartItems.forEach((item) => {
            const storedStock = localStorage.getItem(`stock_${item.id}`);
            const availableStock = storedStock ? JSON.parse(storedStock) : 0;

            if (item.quantity > availableStock) {
                stockSufficient = false;
            }
        });

        if (!stockSufficient) {
            Swal.fire({
                title: "Insufficient Stock",
                text: "Some items in your cart have quantities that exceed the stock",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
        // kurangi stok yang di local storage
        cartItems.forEach((item) => {
            const storedStock = localStorage.getItem(`stock_${item.id}`);
            const availableStock = storedStock ? JSON.parse(storedStock) : 0;
            const newAvailableStock = availableStock - item.quantity;

            localStorage.setItem(
                `stock_${item.id}`,
                JSON.stringify(newAvailableStock),
            );
        });

        // hapus cart after checkout
        dispatch(clearCart());

        Swal.fire({
            title: "Checkout Successful!",
            text: "Thank you for shopping!",
            icon: "success",
            confirmButtonText: "OK",
        }).then(() => {
            navigate("/"); // Redirect to home page
        });
    };

    return (
        <div className="container mx-auto p-4 mt-16">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="mt-16 text-center font-semibold">You haven't selected any items.</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-center py-4">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-md mr-4" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.title}</h2>
                                        <p className="text-gray-600">Price: ${item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, Number(e.target.value))}
                                        className="border rounded w-20 py-1 px-2 text-center"
                                        min="1"
                                    />
                                    <button
                                        onClick={() => handleRemoveFromCart(item)}
                                        className="ml-4 text-red-500 hover:text-red-700">
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between items-center">
                        <p className="text-lg font-semibold">
                            Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </p>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
