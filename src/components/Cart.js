import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice'; // Pastikan Anda memiliki action ini

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleQuantityChange = (item, newQuantity) => {
        // Hitung selisih antara jumlah baru dan jumlah lama
        const quantityDifference = newQuantity - item.quantity;

        // Update jumlah di cart
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));

        // Update stok di localStorage
        const storedStock = localStorage.getItem(`stock_${item.id}`);
        if (storedStock) {
            const availableStock = JSON.parse(storedStock);
            const newAvailableStock = availableStock - quantityDifference;

            // Pastikan stok tidak menjadi negatif
            if (newAvailableStock >= 0) {
                localStorage.setItem(`stock_${item.id}`, JSON.stringify(newAvailableStock));
            } else {
                alert("Stok tidak cukup!");
            }
        }
    };

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item.id));
        // Update stok di localStorage saat item dihapus
        const storedStock = localStorage.getItem(`stock_${item.id}`);
        if (storedStock) {
            const availableStock = JSON.parse(storedStock);
            const newAvailableStock = availableStock + item.quantity; // Kembalikan jumlah yang dihapus ke stok
            localStorage.setItem(`stock_${item.id}`, JSON.stringify(newAvailableStock));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
            {cartItems.length === 0 ? (
                <p>Keranjang Anda kosong.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="border-b py-2">
                            {item.title} - ${item.price} x 
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item, Number (e.target.value))}
                                className="border rounded w-20 mx-2"
                                min="1"
                            />
                            <button onClick={() => handleRemoveFromCart(item)} className="text-red-500">Hapus</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;