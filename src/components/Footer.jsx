import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#1a1a1a] to-[#2e2e2e] text-white px-6 md:px-20 py-10 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 grid-cols-2 gap-8">
        
        {/* Branding */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-bold tracking-wide">Ghumo India</h2>
          <p className="text-sm mt-2 text-gray-400">
            Discover the soul of India with immersive experiences, heritage trails, festivals, and more.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-white transition">States</Link></li>
            <li><Link to="/experiences" className="hover:text-white transition">Experiences</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Useful</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-white transition">Contact</Link></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
          <div className="flex space-x-4 text-xl text-gray-400">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Ghumo India. All rights reserved.</p>
        <p>Crafted with ❤️ in Bharat</p>
      </div>
    </footer>
  );
};

export default Footer;
