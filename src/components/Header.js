import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <header style={{ backgroundColor: '#3F51B5' }} className="text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold italic">Toko<span className='text-orange-500'>Topia</span></h1>
        <nav className="flex justify-end">
          <ul className="flex justify-end">
            <li className="mr-4">
              <a href="#" className="text-white hover:text-orange-500">Beranda</a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-white hover:text-orange-500">Produk</a>
            </li>
            <li className="mr-4">
              <Link to="/cart" className="text-white hover:text-orange-500">Keranjang</Link>
            </li>
            <li>
              <a href="#" className="text-white hover:text-orange-500">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;