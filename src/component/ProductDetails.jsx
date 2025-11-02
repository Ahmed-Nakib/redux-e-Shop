import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Truck, HelpCircle, ArrowRight } from "lucide-react";
import { useGetProductsQuery } from "../services/productApi";

const ProductDetails = () => {
 const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  const product = products.find((p) => p.id === Number(id));

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);


  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty: quantity }));
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load products 😞</p>;
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg">
        ⚠️ Product not found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* 🔹 Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-red-500 transition">Home</Link>
        <ArrowRight size={14} />
        <Link to="/products" className="hover:text-red-500 transition">Products</Link>
        <ArrowRight size={14} />
<span className="text-gray-700 font-medium">{product.title}</span>      </nav>

      {/* 🔹 Main Product Section */}
      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-md p-6">
        {/* Left Side */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-contain rounded-xl shadow-lg border"
          />
        </div>

        {/* Right Side */}
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            {product.title}
          </h2>
          <p className="text-lg font-medium mb-4 text-gray-700">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-2 border rounded focus:outline-none"
            />
            <button
              onClick={handleAddToCart}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition font-medium"
            >
              Add to Cart
            </button>
          </div>

          <div className="space-y-3 text-gray-600">
            <p className="flex items-center gap-2">
              <Truck size={18} /> <span>Delivery & Return</span>
            </p>
            <p className="flex items-center gap-2">
              <HelpCircle size={18} /> <span>Ask a Question</span>
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Description Section */}
      <div className="mt-12 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Product Description
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description || `No detailed description available for this product yet.`}
        </p>
      </div>

      {/* 🔹 Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">
            Related Products
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
              >
                <Link to={`/product-details/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-contain mb-3 rounded-md"
                  />
                  <h4 className="font-medium text-gray-800 truncate">
                    {item.title}
                  </h4>
                  <p className="text-red-500 font-semibold mt-1">
                    ${item.price}
                  </p>
                </Link>
                <button
                  onClick={() => dispatch(addToCart({ ...item, qty: 1 }))}
                  className="mt-3 w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md text-sm transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
