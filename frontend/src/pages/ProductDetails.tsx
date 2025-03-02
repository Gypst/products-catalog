import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      
      <div className="flex place-content-between space-x-4">
        <button
          className="mb-4 px-4 py-2 bg-[#E9762B] text-[#F1F0E9] hover:bg-[#e78544] rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          className="mb-4 px-4 py-2 bg-red-600 text-[#F1F0E9] hover:bg-red-500 rounded"
          onClick={async () => {
            await axios.delete(`http://localhost:3000/products/${product.id}`);
            navigate(-1);
          }}
        >
          Delete
        </button>
      </div>

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
