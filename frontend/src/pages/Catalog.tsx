import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products?page=${page}&limit=${limit}`);
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Каталог товаров</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow rounded-lg cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Назад
        </button>
        <span className="px-4 py-2">{page} / {totalPages}</span>
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Вперед
        </button>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate('/product/new')}
      >
        Добавить продукт
      </button>
    </div>
  );
};

export default Catalog;
