import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice'; // Import action logout
import Swal from 'sweetalert2';


const Header = () => {
 
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);


const handleLogout = () => {
  Swal.fire({
    title: 'Konfirmasi Logout',
    text: "Apakah Anda yakin ingin logout?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(logout()); // Panggil action logout
      Swal.fire(
        'Logout Berhasil!',
        'Anda telah berhasil logout.',
        'success'
      );
    }
  });
};

  return (
    <header style={{ backgroundColor: '#3F51B5' }} className="text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold italic">Toko<span className='text-orange-500'>Topia</span></h1>
        <nav className="flex justify-end">
          <ul className="flex justify-end">
            <li className="mr-4">
              <Link to="/" className="text-white hover:text-orange-500">Beranda</Link>
            </li>
            <li className="mr-4">
              <Link to="/cart" className="text-white hover:text-orange-500">Keranjang</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-white hover:text-orange-500">Logout</button>
              ) : (
                <Link to="/login" className="text-white hover:text-orange-500">Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;