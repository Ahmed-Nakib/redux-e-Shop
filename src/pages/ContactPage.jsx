import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this to an API or email service
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="mt-20 bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Have questions? We’d love to hear from you. Fill out the form below or reach us through the provided contact info.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8 space-y-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-indigo-600" />
              <p className="text-gray-700">
                123 Main Street, City, Country
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-indigo-600" />
              <p className="text-gray-700">+123 456 7890</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-indigo-600" />
              <p className="text-gray-700">contact@company.com</p>
            </div>

            {/* Placeholder for Map */}
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              Google Map Here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
