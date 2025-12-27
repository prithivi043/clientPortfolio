import React from "react";

const FloatingCameraIcon = () => {
  return (
    <div
      className="
        camera-icon
        absolute top-24 right-10
        z-[40]
        w-32 sm:w-36
        select-none pointer-events-none
        animate-camera-float
      "
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 240"
        className="w-full h-auto drop-shadow-[0_40px_90px_rgba(0,0,0,0.65)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b2f3a" />
            <stop offset="100%" stopColor="#12141a" />
          </linearGradient>

          <linearGradient id="gripGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f232c" />
            <stop offset="100%" stopColor="#0b0d12" />
          </linearGradient>

          <radialGradient id="lensOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3a3f55" />
            <stop offset="100%" stopColor="#05060a" />
          </radialGradient>

          <radialGradient id="lensGlass" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#6c7cff" />
            <stop offset="100%" stopColor="#05060a" />
          </radialGradient>

          <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6c7cff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6c7cff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="flashGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          x="40"
          y="90"
          width="240"
          height="110"
          rx="22"
          fill="url(#camBody)"
        />
        <path d="M40 95 C10 115 10 175 40 195 Z" fill="url(#gripGrad)" />
        <rect x="95" y="60" width="130" height="40" rx="10" fill="#1b1f29" />
        <rect
          x="140"
          y="50"
          width="40"
          height="12"
          rx="3"
          fill="#cfd3ff"
          opacity="0.7"
        />

        <circle cx="160" cy="145" r="60" fill="url(#lensGlow)" />
        <circle cx="160" cy="145" r="52" fill="url(#lensOuter)" />
        <circle cx="160" cy="145" r="36" fill="#0c0e16" />
        <circle cx="160" cy="145" r="26" fill="url(#lensGlass)" />

        <ellipse
          cx="148"
          cy="132"
          rx="10"
          ry="7"
          fill="#ffffff"
          opacity="0.45"
        />
        <circle cx="160" cy="145" r="70" fill="url(#flashGrad)" />
        <circle cx="215" cy="82" r="6" fill="#ff5b5b" />
      </svg>
    </div>
  );
};

export default FloatingCameraIcon;
