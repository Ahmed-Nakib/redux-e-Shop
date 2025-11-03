import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const totalCartItems = useSelector(selectCartTotalItems);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center rounded-xl text-white font-bold">
              PN
            </div>
            <div className="hidden sm:block leading-tight">
              <h1 className="text-lg font-semibold text-gray-900">ShopName</h1>
              <p className="text-xs text-gray-500">Fast & Stylish</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100"
            >
              <Search size={18} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100"
            >
              <ShoppingCart size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Profile */}
            <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100">
              <User size={18} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col py-6 px-5 space-y-3 shadow-lg transition-all"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-indigo-600" : "hover:bg-gray-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Search Bar */}
      {isOpen && (
        <form className="absolute top-16 left-0 w-full bg-gray-50 px-4 py-2 shadow-inner hidden sm:block">
          <input
            className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Search for products..."
          />
        </form>
      )}
    </header>
  );
}
