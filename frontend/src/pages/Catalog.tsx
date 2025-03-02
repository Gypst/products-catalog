import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no_image.svg";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 6;

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products?page=${page}&limit=${limit}`
        );
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products catalog</h1>

      <div className="grid grid-cols-2">
        <div />
        <div>
          <button
            className="mb-4 px-4 py-2 float-right bg-[#E9762B] text-[#F1F0E9] hover:bg-[#e78544] rounded"
            onClick={() => navigate("/product/new")}
          >
            Add product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow rounded-lg cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.imageUrl === null ? (
              <div className="h-48 flex items-center justify-center overflow-hidden bg-gray-100 text-gray-400 rounded">
                <img
                  src={noImage}
                  alt="No Image"
                  className="w-full h-48 rounded"
                />
              </div>
            ) : (
              <img
                src={`http://localhost:3000${product.imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
            )}

            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Back
        </button>
        <span className="px-4 py-2">
          {page} / {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Catalog;
