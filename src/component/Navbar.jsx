import React, { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
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

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const btn = mobileMenuRef.current?.querySelector("button[data-close]");
      btn?.focus();
    }
  }, [open]);

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                PN
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-lg text-slate-900">
                  ShopName
                </span>
                <div className="text-xs text-slate-500 -mt-0.5">
                  Fast & Stylish
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-1 items-center ml-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Search"
              className="items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <Search size={18} />
            </button>

            <Link
              to="/cart"
              className="p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 relative"
            >
              <ShoppingCart size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <button
              aria-haspopup="true"
              aria-label="Account"
              className="p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <User size={18} />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center justify-center p-2 rounded-md md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute right-0 top-0 h-full w-64 bg-gray-900 text-white p-5 flex flex-col shadow-2xl">
          {/* Top Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              data-close
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 hover:bg-gray-800 rounded-md transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-indigo-600 text-white font-medium"
                          : "hover:bg-gray-800 text-gray-950 font-bold"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom (optional) */}
          <div className="mt-auto border-t border-gray-700 pt-4">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold transition">
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isOpen && (
        <form className="px-2 py-1 bg-gray-100 hidden md:block absolute top-full left-0 w-full">
          <input
            className="border w-full px-3 py-2 rounded-2xl focus:outline-none"
            type="text"
            placeholder="Search products..."
          />
        </form>
      )}
    </header>
  );
}
