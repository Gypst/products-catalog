import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!product) {
    return <p>Продукт не найден</p>;
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <button
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
      <div className="flex flex-col lg:flex-row">
        <img
          src={`http://localhost:3000${product.imageUrl}`}
          alt={product.name}
          className="w-full lg:w-1/2 h-96 object-cover rounded-lg mb-4 lg:mb-0"
        />
        <div className="lg:ml-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
