import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            ShopName
          </h1>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for the latest gadgets, fashion, and more. Quality products delivered fast and easy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-indigo-500 transition">Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-500 transition">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-500 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Connect with Us</h2>
          <div className="flex items-center gap-4 mb-4">
            <a href="#" className="hover:text-indigo-500 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-indigo-500 transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-indigo-500 transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-indigo-500 transition"><Linkedin size={20} /></a>
          </div>
          <p className="text-gray-400 text-sm">
            📧 info@shopname.com <br />
            📞 +880 123 456 789
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
