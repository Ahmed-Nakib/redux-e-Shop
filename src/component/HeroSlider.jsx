import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "New Arrivals",
    subtitle: "Latest fashion trends just for you",
    image: "hero.png",
    cta: "/products",
  },
  {
    id: 2,
    title: "Mega Sale",
    subtitle: "Up to 50% off on selected items",
    image: "hero1.png",
    cta: "/products",
  },
  {
    id: 3,
    title: "Exclusive Collection",
    subtitle: "Handpicked premium products",
    image: "hero3.png",
    cta: "/products",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // auto slide every 5s
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <Motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 w-full h-full bg-cover bg-center`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {index === current && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                <a
                  href={slide.cta}
                  className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Shop Now
                </a>
              </div>
            </div>
          )}
        </Motion.div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/80 shadow-md"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/80 shadow-md"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-indigo-600" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
