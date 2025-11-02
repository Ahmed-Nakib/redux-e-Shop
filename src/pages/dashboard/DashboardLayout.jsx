
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Package, Image, LayoutDashboard } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [bannerDropdown, setBannerDropdown] = useState(false);

  const productRef = useRef(null);
  const bannerRef = useRef(null);
  const location = useLocation();

  // outside click এ dropdown বন্ধ করা
  useEffect(() => {
    const handler = (e) => {
      if (productRef.current && !productRef.current.contains(e.target)) {
        setProductDropdown(false);
      }
      if (bannerRef.current && !bannerRef.current.contains(e.target)) {
        setBannerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 bg-white shadow-lg w-64 p-5 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-600" />
            Dashboard
          </h1>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {/* Add Product Dropdown */}
          <div className="relative" ref={productRef}>
            <button
              onClick={() => setProductDropdown((prev) => !prev)}
              className="flex items-center justify-between w-full gap-2 p-2 rounded hover:bg-blue-100"
            >
              <span className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                Add Product
              </span>
              <span className="text-gray-600">
                {productDropdown ? "▴" : "▾"}
              </span>
            </button>

            {productDropdown && (
              <div className="absolute left-0 mt-1 w-full bg-white shadow-md border border-gray-200 rounded-md py-1 z-50">
                <Link
                  to="add-product"
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    location.pathname.endsWith("add-product")
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  ➕ New Product
                </Link>
                <Link
                  to="manage-products"
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    location.pathname.endsWith("manage-products")
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  📦 Manage Products
                </Link>
              </div>
            )}
          </div>

          {/* Add Banner Dropdown */}
          <div className="relative" ref={bannerRef}>
            <button
              onClick={() => setBannerDropdown((prev) => !prev)}
              className="flex items-center justify-between w-full gap-2 p-2 rounded hover:bg-blue-100"
            >
              <span className="flex items-center gap-2">
                <Image className="w-5 h-5 text-blue-500" />
                Add Banner
              </span>
              <span className="text-gray-600">
                {bannerDropdown ? "▴" : "▾"}
              </span>
            </button>

            {bannerDropdown && (
              <div className="absolute left-0 mt-1 w-full bg-white shadow-md border border-gray-200 rounded-md py-1 z-50">
                <Link
                  to="add-banner"
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    location.pathname.endsWith("add-banner")
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  🖼️ New Banner
                </Link>
                <Link
                  to="manage-banners"
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    location.pathname.endsWith("manage-banners")
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  🧾 Manage Banners
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 p-5 md:ml-0">
        <button
          className="md:hidden mb-4 text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </button>

        {/* এখানেই nested pages render হবে */}
        <div className="bg-white p-6 rounded-lg shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
