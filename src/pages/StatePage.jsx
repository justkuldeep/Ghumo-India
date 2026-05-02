import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const zoomIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const StateWorld = () => {
  const { slug } = useParams();
  const [state, setState] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/states.json");
      const data = await res.json();
      const found = data.find((s) => s.slug === slug);
      setState(found);
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (state && state.music) {
      const bgAudio = new Audio(`/${state.music}`);
      bgAudio.loop = true;
      bgAudio.volume = 0.4;
      setAudio(bgAudio);
      bgAudio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [state]);

  const toggleAudio = () => {
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (!state)
    return (
      <div className="text-center mt-16 text-red-500 font-bold text-3xl">
        Loading Incredible Experience...
      </div>
    );

  const Section = ({ title, items, isImageOnly = false }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-5xl md:text-6xl font-extrabold mb-14 text-yellow-300 border-b-[6px] border-yellow-400 pb-4 tracking-wide">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-16">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-lg group hover:scale-105 transition-all duration-300"
            variants={zoomIn}
          >
            <img
              src={`/${isImageOnly ? item : item.image}`}
              alt={item.name || item.title || `Item ${i}`}
              className="w-full h-[360px] object-cover group-hover:brightness-75 transition duration-300"
            />
            {!isImageOnly && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6">
                <p className="text-3xl font-semibold text-white drop-shadow-lg">
                  {item.name || item.title}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen text-white font-[Poppins]"
      style={{
        background: `linear-gradient(to bottom, ${state.bgTheme || "#1a1a1a"}, #000)`,
      }}
    >
      {/* Hero Section */}
      <div className="relative h-[110vh] w-full overflow-hidden">
        <img
          src={`/${state.image}`}
          alt={state.name}
          className="absolute inset-0 w-full h-full object-cover scale-110 brightness-[.3]"
        />
        <div className="relative z-10 flex flex-col justify-end h-full px-16 pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-7xl md:text-9xl font-extrabold drop-shadow-[4px_4px_20px_rgba(0,0,0,0.9)] tracking-wider">
              {state.name}
            </h1>
            <p className="text-3xl md:text-4xl font-light mt-6 italic text-gray-200">
              {state.tagline}
            </p>
          </motion.div>
          {state.music && (
            <button
              className="absolute top-8 right-8 bg-white/10 hover:bg-white/30 backdrop-blur-lg p-5 rounded-full text-white transition duration-300"
              onClick={toggleAudio}
              title="Toggle Music"
            >
              {isPlaying ? <FaVolumeUp size={28} /> : <FaVolumeMute size={28} />}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1700px] mx-auto px-10 md:px-24 py-28 space-y-40">
        {/* Description */}
        <motion.p
          className="text-3xl md:text-4xl leading-loose bg-white/10 text-white p-16 rounded-3xl shadow-2xl backdrop-blur-xl tracking-wide font-light border-l-[12px] border-yellow-400"
          initial="hidden"
          animate="visible"
          variants={zoomIn}
          transition={{ duration: 0.7 }}
        >
          {state.description}
        </motion.p>

        {/* Highlights */}
        {state.highlights && (
          <Section title="Top Highlights" items={state.highlights} />
        )}

        {/* Cuisine */}
        {state.food && (
          <Section title="Famous Cuisine" items={state.food} />
        )}

        {/* Festivals */}
        {state.festivals && (
          <Section title="Festivals" items={state.festivals} />
        )}

        {/* Gallery */}
        {state.gallery && (
          <Section
            title="Gallery"
            items={state.gallery}
            isImageOnly={true}
          />
        )}
      </div>
    </div>
  );
};

export default StateWorld;
