import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    { title: "Men", image: "/men.png" },
    { title: "Women", image: "/women.png" },
    { title: "Kids", image: "/kid.png" },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(`/category/${cat.title.toLowerCase()}`)}
            className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-60 sm:h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                {cat.title}
              </h3>
              <button className="px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                View All
              </button>
            </div>

            <div className="absolute top-3 left-3 bg-white/90 text-gray-900 text-sm px-3 py-1 rounded-md font-semibold">
              {cat.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
