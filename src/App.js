import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import './App.css'

const App = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <ProductList />
      </div>
    </div>
  );
};

export default App;