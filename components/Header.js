// components/Header.js
import { useState, useEffect } from "react";
import { Menu, X, Music, VolumeX, CloudRain, CloudOff } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rainOn, setRainOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    const savedRain = localStorage.getItem("rainOn");
    const savedMusic = localStorage.getItem("musicOn");
    if (savedRain !== null) setRainOn(savedRain === "true");
    if (savedMusic !== null) setMusicOn(savedMusic === "true");
  }, []);

  useEffect(() => {
    const rainAudio = document.getElementById("rain-audio");
    const musicAudio = document.getElementById("soundtrack-audio");

    if (rainAudio) {
      rainAudio.loop = true;
      if (rainOn) {
        rainAudio.muted = false;
        rainAudio.play().catch(() => {});
      } else {
        rainAudio.muted = true;
        rainAudio.pause();
      }
    }

    if (musicAudio) {
      musicAudio.loop = true;
      if (musicOn) {
        musicAudio.muted = false;
        musicAudio.play().catch(() => {});
      } else {
        musicAudio.muted = true;
        musicAudio.pause();
      }
    }

    localStorage.setItem("rainOn", rainOn);
    localStorage.setItem("musicOn", musicOn);
  }, [rainOn, musicOn]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side empty or logo placeholder */}
        <div />

        {/* Right: Audio Toggles + Burger with glass neon background */}
        <div
          className="flex items-center gap-4 px-4 py-2 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(122,252,255,0.15), rgba(255,77,210,0.15))",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(122,252,255,0.25)",
            boxShadow: "0 0 20px rgba(122,252,255,0.35), 0 0 30px rgba(255,77,210,0.25)",
          }}
        >
          {/* Rain Toggle */}
          <button
            type="button"
            onClick={() => setRainOn(!rainOn)}
            className="p-1 rounded-sm transition hover:text-[#7afcff]"
            aria-label="Toggle Rain Sound"
          >
            {rainOn ? <CloudRain size={18} /> : <CloudOff size={18} />}
          </button>

          {/* Music Toggle */}
          <button
            type="button"
            onClick={() => setMusicOn(!musicOn)}
            className="p-1 rounded-sm transition hover:text-[#ff4dd2]"
            aria-label="Toggle Soundtrack"
          >
            {musicOn ? <Music size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Burger Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
            className="p-2 hover:text-cyan-300 transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Side Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(122,252,255,0.12), rgba(255,77,210,0.12))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(122,252,255,0.25)",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
            className="hover:text-pink-400 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-6 px-6 py-4 text-lg font-semibold">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/shop">Shop</Link>
        </nav>
      </div>
    </header>
  );
}
