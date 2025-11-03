import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "New Arrivals",
    subtitle: "Latest fashion trends just for you",
    image: "/hero.png",
    cta: "/products",
  },
  {
    id: 2,
    title: "Mega Sale",
    subtitle: "Up to 50% off on selected items",
    image: "/hero1.png",
    cta: "/products",
  },
  {
    id: 3,
    title: "Exclusive Collection",
    subtitle: "Handpicked premium products",
    image: "/hero3.png",
    cta: "/products",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <Motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {index === current && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.cta}
                  className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition"
                >
                  Shop Now
                </a>
              </div>
            </div>
          )}
        </Motion.div>
      ))}

      {/* Arrows */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white shadow-md"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white shadow-md"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-indigo-600" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
