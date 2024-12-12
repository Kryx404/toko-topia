import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="border-b py-2">
              {item.title} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;