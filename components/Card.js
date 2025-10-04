// components/Card.js
import Link from "next/link";
import { useRef, useEffect, useState, useMemo } from "react";
import TronCircuit from "./TronCircuit";

export default function Card({
  title,
  subtitle,
  blurb,
  href,
  shopLink,
  imageSrc,
  videoSrc,
}) {
  const mainVideoRef = useRef(null);
  const cardRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const delay = useMemo(() => `${Math.random() * 3}s`, []);

  useEffect(() => {
    const mv = mainVideoRef.current;
    if (mv) {
      mv.muted = true;
      mv.playsInline = true;
      mv.preload = "auto";
      mv.loop = true;
    }
  }, []);

  const handlePointerEnter = async () => {
    setHovering(true);
    const mv = mainVideoRef.current;
    if (mv) {
      try {
        await mv.play();
      } catch {}
    }
  };

  const handlePointerLeave = () => {
    setHovering(false);
    setTiltStyle({ transform: "rotateX(0deg) rotateY(0deg)" });
    const mv = mainVideoRef.current;
    if (mv) {
      try {
        mv.pause();
        mv.currentTime = 0;
      } catch {}
    }
  };

  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease",
    });
  };

  const media = (
    <div
      className="scene-card__media-wrapper feathered-mask relative overflow-hidden rounded-lg z-10"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ minHeight: 200 }}
    >
      {/* Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title || ""}
          className="absolute left-0 top-0 w-full h-full object-cover transition-opacity duration-500 rounded-lg"
          style={{
            opacity: hovering ? 0 : 0.95,
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Video */}
      {videoSrc && (
        <video
          ref={mainVideoRef}
          src={videoSrc}
          playsInline
          muted
          loop
          preload="auto"
          className="absolute left-0 top-0 w-full h-full object-cover transition-opacity duration-500 rounded-lg"
          style={{
            opacity: hovering ? 0.95 : 0,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );

  return (
    <div
      ref={cardRef}
      className="group neon-card relative overflow-hidden"
      style={{ "--delay": delay, ...tiltStyle }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Tron circuit background */}
      <TronCircuit className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70" />

      {href ? (
        <Link href={href} legacyBehavior>
          <a className="block relative z-10">
            {media}
            <div className="p-4 relative z-10">
              {title && (
                <h3 className="neon-title text-xl font-bold mb-1">{title}</h3>
              )}
              {subtitle && (
                <p className="neon-accent text-sm mb-2">{subtitle}</p>
              )}
              {blurb && <p className="text-white/80 text-sm mb-2">{blurb}</p>}
            </div>
          </a>
        </Link>
      ) : (
        <div className="relative z-10">
          {media}
          <div className="p-4 relative z-10">
            {title && (
              <h3 className="neon-title text-xl font-bold mb-1">{title}</h3>
            )}
            {subtitle && (
              <p className="neon-accent text-sm mb-2">{subtitle}</p>
            )}
            {blurb && <p className="text-white/80 text-sm mb-2">{blurb}</p>}
          </div>
        </div>
      )}

      {shopLink && (
        <div className="p-4 pt-0 relative z-10">
          <Link href={shopLink} legacyBehavior>
            <a className="shop-btn" target="_blank" rel="noopener noreferrer">
              Shop the Look
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
