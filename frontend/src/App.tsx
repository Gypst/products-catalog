import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import ProductForm from './pages/ProductForm';
import ProductDetails from './pages/ProductDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/product/new" element={<ProductForm />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
