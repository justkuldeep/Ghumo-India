import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Experiences", path: "/experiences" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-bold tracking-wide flex items-center"
        >
          <span className="text-yellow-400 drop-shadow-md">Ghumo</span>
          <span className="text-white drop-shadow-md ml-2">India</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-10 text-lg">
          {navLinks.map(({ name, path }, i) => (
            <Link
              key={i}
              to={path}
              className={`text-white relative group font-medium transition ${
                location.pathname === path ? "text-yellow-400" : "hover:text-yellow-300"
              }`}
            >
              {name}
              <span className="block h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full shadow-md hover:bg-yellow-300 transition"
        >
          Discover India
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
