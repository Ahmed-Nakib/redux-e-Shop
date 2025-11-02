import React from 'react'
import { useGetProductsQuery } from '../services/productApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const Products = () => {
    const navigate = useNavigate()
    const {data: products = [], isLoading, error } = useGetProductsQuery()

    const dispatch = useDispatch ();
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          🌟 Latest Products
        </h2>
        <p className="text-gray-500 text-lg">
          Discover our newest arrivals, designed to make your life easier.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl text-blue-500 animate-pulse">Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 shadow-md w-full max-w-3xl mx-auto text-center">
          <h2 className="font-semibold text-lg">❌ Error:</h2>
          <p>{error?.error || "Something went wrong."}</p>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && !error && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              onClick={() => navigate(`/product-details/${product.id}`)}
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              {product.image && (
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    New
                  </span>
                </div>
              )}

              {/* Product Info */}
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  <button 
                   onClick={() => dispatch(addToCart({ ...product, qty: 1 }))}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
