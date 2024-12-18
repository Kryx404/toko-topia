import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice'; // Pastikan Anda memiliki action ini

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();


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

    const handleCheckout = () => {
let stockSufficient = true;

cartItems.forEach(item => {
    const storedStock = localStorage.getItem(`stock_${item.id}`);
    const availableStock = storedStock ? JSON.parse(storedStock) : 0;

    if (item.quantity > availableStock){
        stockSufficient = false;
    }
});

if (!stockSufficient){
    Swal.fire ({
        title: 'Stok Tidak Cukup',
        text: 'Beberapa item di keranjang anda memiliki quantity yang melebihi stok',
        icon: 'error',
        confirmButtonText: 'ok',
    });
    return;
}
    // kurangi stok yang di local storage
    cartItems.forEach(item => {
        const storedStock = localStorage.getItem(`stock_${item.id}`);
        const availableStock = storedStock ? JSON.parse(storedStock) : 0;
        const newAvailableStock = availableStock - item.quantity;

        localStorage.setItem(`stock_${item.id}`, JSON.stringify(newAvailableStock));
    });

    // hapus cart after checkout
    dispatch(clearCart());

    Swal.fire({
        title: 'Checkout Berhasil!',
        text: 'Terima kasih telah berbelanja!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        navigate('/'); // Redirect to home page
    });
};

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
            {cartItems.length === 0 ? (
                <p>Anda belum memilih item.</p>
            ) : (
               <div>
               <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="border-b py-2 flex items-center">
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
                <button onClick={handleCheckout} className='mt-4 bg-green-500 text-white py-2 px-4 rounded'>Checkout</button>
                
                </div>
            )}
        </div>
    );
};

export default Cart;