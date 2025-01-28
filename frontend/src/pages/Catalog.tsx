import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  discountedPrice?: number;
  imageUrl: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // Убираем удаленный продукт из списка
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='text-center'>
      <h1 className="text-2xl font-bold mb-4">Каталог продуктов</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow rounded-lg relative"
          >
            <img
              src={`http://localhost:3000${product.imageUrl}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600"><span className= {`${product.discountedPrice? 'line-through' : ''}`}>{product.price}</span></p>
            {product.discountedPrice ?? <p>{product.discountedPrice}</p>}
            <button
              className="absolute bottom-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded"
              onClick={() => handleDelete(product.id)}
            >
              Удалить
            </button>
          </div>
        ))}
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
