import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  const handleClick = (slug) => {
    navigate(`/state/${slug}`);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#0e0e0e] to-[#070707] text-white overflow-hidden py-28">
      {/* Glowing Mandala Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[60rem] h-[60rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)] top-[-30rem] left-[-20rem]" />
        <div className="absolute w-[40rem] h-[40rem] bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.04),transparent)] bottom-[-20rem] right-[-10rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Cinematic Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-rose-500 to-red-500 bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-xl">
            Welcome to Ghumo India
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg tracking-wide">
            Embark on a journey through heritage, flavors, festivals, and nature across India's most iconic states.
          </p>
        </motion.div>

        {/* State Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {states.map((state, index) => (
            <motion.div
              key={state.id}
              onClick={() => handleClick(state.slug)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image + Overlay */}
              <div className="relative h-[20rem] overflow-hidden">
                <img
                  src={state.image}
                  alt={state.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent opacity-70 group-hover:opacity-50 transition duration-500" />
              </div>

              {/* Text Content */}
              <div className="p-6">
                <h3 className="text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                  {state.name}
                </h3>
                <p className="text-gray-400 text-sm mt-2 tracking-wide">
                  {state.tagline}
                </p>
              </div>

              {/* Glowing border hover effect */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-yellow-300/30 transition duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
