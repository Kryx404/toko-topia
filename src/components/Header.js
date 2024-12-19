import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice"; // Import action logout
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faRightToBracket,
    faRightFromBracket,
    faHouse,
    faTimes,
    faBars,
} from "@fortawesome/free-solid-svg-icons";

// Komponen Header yang menampilkan navigasi dan fitur pencarian
const Header = ({ onSearch }) => {
    // Menggunakan hook useDispatch untuk memanggil action logout
    const dispatch = useDispatch();

    // Menggunakan hook useSelector untuk memeriksa status login pengguna
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // Menggunakan hook useState untuk mengelola state pencarian
    const [searchTerm, setSearchTerm] = useState("");

    // State untuk menentukan apakah sidebar terbuka atau tidak
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Menggunakan hook useRef untuk mendapatkan referensi sidebar
    const sidebarRef = useRef(null);

    // Fungsi untuk menangani logout pengguna
    const handleLogout = () => {
        // Menampilkan konfirmasi logout menggunakan SweetAlert2
        Swal.fire({
            title: "Logout Confirmation",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Memanggil action logout jika pengguna mengkonfirmasi
                dispatch(logout());
                // Menampilkan notifikasi logout berhasil
                Swal.fire(
                    "Logout Successful!",
                    "You have successfully logged out.",
                    "success",
                );
            }
        });
    };

    // Fungsi untuk menangani perubahan input pencarian
    const handleSearchChange = (e) => {
        // Mengupdate state pencarian
        setSearchTerm(e.target.value);
        // Memanggil fungsi onSearch yang diteruskan sebagai props
        onSearch(e.target.value);
    };

    // Fungsi untuk menampilkan atau menyembunyikan sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Effect untuk menutup sidebar ketika klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <header
            className="fixed top-0 left-0 w-full text-black py-4 bg-white shadow-md"
            style={{ zIndex: 1000 }}>
            <div className="container mx-auto mx-4 px-4 md:px-0 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="-m-1.5 p-1.5 flex items-center">
                        <img
                            alt="TokoTopia"
                            src={`${process.env.PUBLIC_URL}/logo-tokotopia.png`}
                            className="h-8 w-auto mr-3"
                        />
                        <h1 className="text-lg font-bold">TokoTopia</h1>
                    </Link>
                </div>

                <div className="hidden flex justify-center mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border rounded p-2 w-full md:w-96"
                    />
                </div>

                <nav className="hidden md:flex flex-row items-center">
                    <ul className="flex flex-row justify-end gap-4 items-center">
                        <li>
                            <Link
                                to="/"
                                className="text-black hover:text-blue-700 flex items-center">
                                <FontAwesomeIcon
                                    icon={faHouse}
                                    className="mr-2"
                                />
                                Homepage
                            </Link>
                        </li>
                        {isLoggedIn && (
                            <li>
                                <Link
                                    to="/cart"
                                    className="text-black hover:text-blue-700 flex items-center">
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                        className="mr-2"
                                    />
                                    Cart
                                </Link>
                            </li>
                        )}
                        <li>
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:bg-blue-500 py-2 px-6 bg-blue-700 rounded-lg flex items-center">
                                    Logout
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className="ml-2"
                                    />
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-white hover:bg-blue-500 py-2 px-6 bg-blue-700 rounded-lg flex items-center">
                                    Login
                                    <FontAwesomeIcon
                                        icon={faRightToBracket}
                                        className="ml-2"
                                    />
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
                {/* Icon sidebar */}
                <div className="md:hidden">
                    <button onClick={toggleSidebar} className="text-black">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>
            

            {/* Sidebar */}
            {isSidebarOpen && (
                <div ref={sidebarRef} className="fixed inset-y-0 right-0 bg-white z-50 md:hidden w-64 shadow-lg transition-transform transform duration-300 ease-in-out" style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button onClick={toggleSidebar} className="text-black">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="p-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border rounded p-2 w-full"
                        />
                        <ul className="flex flex-col mt-4">
                            <li>
                                <Link to="/" className="text-black hover:text-blue-700 flex items-center py-2">
                                    <FontAwesomeIcon icon={faHouse} className="mr-2" />
                                    Homepage
                                </Link>
                            </li>
                            {isLoggedIn && (
                                <li>
                                    <Link to="/cart" className="text-black hover:text-blue-700 flex items-center py-2">
                                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                        Cart
                                    </Link>
                                </li>
                            )}
                            <li>
                                {isLoggedIn ? (
                                    <button onClick={handleLogout} className="text-black hover:text-blue-700 flex items-center py-2">
                                        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/login" className="text-black hover:text-blue-700 flex items-center py-2">
                                        <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
