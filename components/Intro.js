// components/Intro.js
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Client-only import of RuneGenerator
const RuneGenerator = dynamic(() => import("./RuneGenerator"), {
  ssr: false,
});

export default function Intro({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const runeRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFinish();
    }, 5000); // auto-finish after 5s
    return () => clearTimeout(timer);
  }, []);

  const playBurstSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);

    // trigger visual burst
    if (runeRef.current && runeRef.current.triggerBurstVisual) {
      runeRef.current.triggerBurstVisual();
    }
  };

  const handleFinish = () => {
    setVisible(false);
    playBurstSound();
    if (onFinish) onFinish();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <RuneGenerator ref={runeRef} />
      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 px-4 py-2 text-sm font-bold text-cyan-300 border border-cyan-500 rounded-lg hover:bg-cyan-500 hover:text-black transition"
      >
        Skip Intro
      </button>
    </div>
  );
}
