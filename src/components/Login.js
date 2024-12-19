import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // default email & password
    const defaultEmail = "John@gmail.com";
    const defaultPassword = "m38rmF$";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_USERS}/users/1`,
                );
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // login login default email
        if (email === defaultEmail && password === defaultPassword) {
            const token = "some_unique_token";
            localStorage.setItem("token", token);

            // Logika untuk autentikasi pengguna dapat ditambahkan di sini
            console.log("Email:", email);
            console.log("Password:", password);

            // Setelah login berhasil, arahkan pengguna ke halaman beranda atau halaman lain
            dispatch(login({ email }));
            Swal.fire({
                title: "Login Successful!",
                text: "Welcome back!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/"); // Arahkan pengguna ke halaman beranda
            });
        } else {
            Swal.fire({
                title: "Login Failed!",
                text: "Incorrect email or password.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <section className="bg-gray-50 mt-16">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    TokoTopia
                </a>
                <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
                {/* user yang terdaftar */}
                <div className="text-center text-gray-600 mt-4">
                    <h3>USER DEFAULT</h3>
                    <p>email:John@gmail.com</p>
                    <p>password:m38rmF$</p>
                </div>
            </div>
        </section>
    );
};

export default Login;
