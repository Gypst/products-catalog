import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('price', price.toString());
    formData.append('description', description);
    if (image) formData.append('file', image);

    try {
      await axios.post('http://localhost:3000/products', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form className="bg-white p-6 shadow rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">SKU</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          className="w-full border p-2 rounded"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
