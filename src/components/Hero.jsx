import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import {
  Md360,
  MdTerrain,
  MdPark,
  MdOutlineEmojiNature,
  MdAccountBalance,
  MdSelfImprovement,
} from "react-icons/md";
import ladakhVideo from "../assets/images/hero.mp4";

const Hero = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [activeTab, setActiveTab] = useState("India 360");

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const themes = [
    { label: "India 360", icon: <Md360 /> },
    { label: "Adventure", icon: <MdTerrain /> },
    { label: "Nature", icon: <MdPark /> },
    { label: "Wildlife", icon: <MdOutlineEmojiNature /> },
    { label: "Heritage", icon: <MdAccountBalance /> },
    { label: "Spiritual", icon: <MdSelfImprovement /> },
  ];

  const renderContent = () => {
    const styles = "text-yellow-300 text-lg md:text-xl font-medium drop-shadow";
    switch (activeTab) {
      case "India 360":
        return <p className={styles}>🌏 Explore India in 360°</p>;
      case "Adventure":
        return <p className={styles}>⛰️ Thrilling Adventures await!</p>;
      case "Nature":
        return <p className={styles}>🍃 Connect with Nature</p>;
      case "Wildlife":
        return <p className={styles}>🦁 Discover Wildlife Sanctuaries</p>;
      case "Heritage":
        return <p className={styles}>🏛️ Step into Indian Heritage</p>;
      case "Spiritual":
        return <p className={styles}>🕉️ Experience Spiritual India</p>;
      default:
        return null;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={ladakhVideo}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />

      {/* Inspired by Incredible India – Elegant Audio Control */}
<button
  onClick={toggleMute}
  className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50
             bg-white/10 hover:bg-white/20 backdrop-blur-md
             border border-white/30 rounded-full p-3
             transition-all duration-300 shadow-xl group"
>
  <div
    className="w-9 h-9 flex items-center justify-center rounded-full
               bg-gradient-to-br from-yellow-400 to-yellow-500
               text-white group-hover:scale-110 transition-transform"
  >
    {muted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
  </div>
</button>


      {/* Bottom Tabs */}
      <div className="absolute bottom-0 w-full z-20 flex justify-center items-center gap-4 md:gap-8 px-4 py-3 bg-white/10 backdrop-blur-lg rounded-t-xl border-t border-white/20 shadow-inner text-xs md:text-lg font-semibold">
        {themes.map((tab, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(tab.label)}
            className={`cursor-pointer flex items-center gap-1 md:gap-2 transition-all duration-300 px-2 py-1 ${
              activeTab === tab.label
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-white hover:text-yellow-300"
            }`}
          >
            {tab.icon}
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="absolute bottom-20 w-full text-center z-20">
        {renderContent()}
      </div>
    </section>
  );
};

export default Hero;
