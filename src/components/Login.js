import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // default email & password
  const defaultEmail = 'John@gmail.com';
  const defaultPassword = 'm38rmF$';

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_USERS}/users/1`);
      const data = await response.json();
      setUsers(data);
    }catch (error) {
      console.error('Error fetching users:', error);
  }
};
fetchUsers();
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // login login default email
    if (email === defaultEmail && password === defaultPassword) {
const token = 'some_unique_token';
localStorage.setItem('token', token);

    // Logika untuk autentikasi pengguna dapat ditambahkan di sini
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Setelah login berhasil, arahkan pengguna ke halaman beranda atau halaman lain
    dispatch(login({ email }));
    Swal.fire({
      title: 'Login Berhasil!',
      text: 'Selamat datang kembali!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/'); // Arahkan pengguna ke halaman beranda
    });
  } else {
    Swal.fire({
      title: 'Login Gagal!',
      text: 'Email atau password salah.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Login
        </button>

        {/* user yang terdaftar */}
        <div className="text-center text-gray-600 mt-4">  email:John@gmail.com
                password:m38rmF$</div>
      </form>
    </div>
  );
};

export default Login;