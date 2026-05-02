import React, { useEffect, useState } from "react";
import StateCard from "./StateCard";

const DiscoverIndia = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch("/data/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1a1a] via-[#222] to-[#1c1c1c] text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Premium Gradient Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-md">
          Discover India
        </h2>

        {/* Sub-heading */}
        <p className="text-center max-w-2xl mx-auto text-gray-300 text-lg mb-12 font-medium">
          Journey through the culture, spirit, and beauty of every Indian state.
        </p>

        {/* Grid of Cards */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {states.map((state) => (
            <StateCard
              key={state.id}
              name={state.name}
              tagline={state.tagline}
              image={state.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverIndia;
