// components/TronCircuit.js
import React from "react";

export default function TronCircuit({ className = "" }) {
  return (
    <div className={`tron-circuit ${className || ""}`} aria-hidden="true">
      <svg
        className="tron-svg"
        viewBox="0 0 360 220"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="tron-grad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#7afcff" />
            <stop offset="50%" stopColor="#00ffd5" />
            <stop offset="100%" stopColor="#7afcff" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* static faint traces */}
        <g stroke="url(#tron-grad)" strokeWidth="1.6" fill="none" opacity="0.12">
          <path d="M40 40 H120 V80 H160" />
          <path d="M200 40 H280 V80 H320" />
          <path d="M40 180 H120 V140 H160" />
          <path d="M200 180 H280 V140 H320" />
          <path d="M160 80 H200" />
          <path d="M160 140 H200" />
        </g>

        {/* animated tracer strokes (glowing) */}
        <g stroke="#00ffd5" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#glow)">
          <path className="trace trace-1" d="M40 40 H120 V80 H160" />
          <path className="trace trace-2" d="M200 40 H280 V80 H320" />
          <path className="trace trace-3" d="M40 180 H120 V140 H160" />
          <path className="trace trace-4" d="M200 180 H280 V140 H320" />
          <path className="trace trace-5" d="M160 80 H200" />
          <path className="trace trace-6" d="M160 140 H200" />
        </g>
      </svg>
    </div>
  );
}
