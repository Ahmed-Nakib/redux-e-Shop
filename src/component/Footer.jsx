import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-300 py-14 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 🛍 Brand & About */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <span className="bg-indigo-600 text-white px-2 py-1 rounded-md">Shop</span>Zone
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop shop for the latest gadgets, fashion, and more.  
            Quality products delivered fast and easy — just a click away!
          </p>
        </div>

        {/* ⚡ Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 border-l-4 border-indigo-500 pl-3">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: "About Us", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-indigo-400 transition duration-300 relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 🌐 Social & Contact */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 border-l-4 border-indigo-500 pl-3">
            Connect with Us
          </h2>
          <div className="flex items-center gap-5 mb-4">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-2 rounded-full bg-gray-700 hover:bg-indigo-600 text-white transition duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm space-y-1">
            <span className="block">📧 info@shopzone.com</span>
            <span className="block">📞 +880 123 456 789</span>
          </p>
        </div>

      </div>

      {/* ⚙️ Bottom Line */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">ShopZone</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
