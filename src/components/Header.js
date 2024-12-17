import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice"; // Import action logout
import Swal from "sweetalert2";

const Header = ({ onSearch }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogout = () => {
        Swal.fire({
            title: "Konfirmasi Logout",
            text: "Apakah Anda yakin ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Logout",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logout()); // Panggil action logout
                Swal.fire(
                    "Logout Berhasil!",
                    "Anda telah berhasil logout.",
                    "success",
                );
            }
        });
    };

    // search
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <header
            className="fixed top-0 left-0 w-full text-black py-4 bg-white"
            style={{ zIndex: 1000 }}>
            <div className="container mx-auto flex items-center">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>

                <div className="flex-grow mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border rounded p-2 w-full md:w-96"
                    />
                    </div>
                    <nav className="flex justify-end">
                        <ul className="flex justify-end gap-2 items-center">
                            <li className="mr-4">
                                <Link
                                    to="/"
                                    className="text-black hover:text-blue-700">
                                    Homepage
                                </Link>
                            </li>
                            {isLoggedIn && (
                                <li className="mr-4">
                                    <Link
                                        to="/cart"
                                        className="text-black hover:text-blue-700">
                                        Keranjang
                                    </Link>
                                </li>
                            )}
                            <li>
                                {isLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className="text-white hover:bg-blue-500 py-2 px-6 bg-blue-700 rounded-lg">
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="text-white hover:bg-blue-500 py-2 px-6 bg-blue-700 rounded-lg">
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
        </header>
    );
};

export default Header;
