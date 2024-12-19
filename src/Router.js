import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Footer from './components/Footer';

const AppRouter = () => {
    return (
      <div className= "flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
        <Footer/>
      </div>
    );
};

export default AppRouter;