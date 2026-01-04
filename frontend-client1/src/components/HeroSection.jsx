import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const sparkleLayerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-block", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      if ("ontouchstart" in window) return;

      const createSparkle = (x, y) => {
        const sparkle = document.createElement("span");
        sparkle.className = "cursor-sparkle";

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        sparkleLayerRef.current.appendChild(sparkle);

        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;

        gsap.fromTo(
          sparkle,
          {
            scale: 1,
            opacity: 1,
          },
          {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            scale: 0,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            onComplete: () => sparkle.remove(),
          }
        );
      };

      let lastTime = 0;

      const onMove = (e) => {
        const now = Date.now();
        if (now - lastTime < 30) return;
        lastTime = now;

        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        createSparkle(x, y);
      };

      sectionRef.current.addEventListener("mousemove", onMove);

      return () => {
        sectionRef.current.removeEventListener("mousemove", onMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="HeroSection"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 blur-[1px] opacity-95"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/hd/graphic-design-g-monogram-design-c4wecexdbz0k1ppq.jpg')",
        }}
      />

      {/* dark overlays */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* sparkle layer */}
      <div
        ref={sparkleLayerRef}
        className="pointer-events-none absolute inset-0 z-30"
      />

      {/* glowing arrows */}
      <svg
        className="absolute left-[12%] top-[35%] w-40 h-40 text-[#22FF60]"
        viewBox="0 0 200 200"
        fill="none"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(34,255,96,0.7)) drop-shadow(0 0 16px rgba(34,255,96,0.45))",
        }}
      >
        <path
          d="M20 120 C40 40, 120 40, 140 80"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M140 80 L130 70 M140 80 L125 85"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute right-[14%] bottom-[30%] w-36 h-36 text-[#22FF60]"
        viewBox="0 0 200 200"
        fill="none"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(34,255,96,0.7)) drop-shadow(0 0 16px rgba(34,255,96,0.45))",
        }}
      >
        <path
          d="M180 60 C140 160, 60 160, 40 120"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 120 L55 115 M40 120 L52 132"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* content */}
      <div className="relative z-10 text-center px-6">
        <div className="hero-block max-w-3xl mx-auto">
          <p className="text-sm tracking-widest text-gray-200 mb-6">
            GRAPHIC DESIGN · VIDEO EDITING
          </p>

          <h1 className="leading-[0.95] mb-10">
            <span
              className="
                block text-[64px] sm:text-[96px] font-extrabold
                bg-gradient-to-b from-white via-[#f1f1f1] to-[#cfcfcf]
                bg-clip-text text-transparent
                drop-shadow-[0_2px_18px_rgba(255,255,255,0.45)]
              "
            >
              Portfolio
            </span>
          </h1>

          <p className="text-lg text-gray-100 max-w-xl mx-auto mb-14 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            I design visual systems and motion experiences that communicate with
            clarity, restraint, and long-term intent.
          </p>

          <div className="flex items-center justify-center gap-10">
            <button
              onClick={() =>
                document
                  .getElementById("ProjectSamples")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                relative text-base font-medium text-white
                drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]
                after:absolute after:left-0 after:-bottom-2
                after:h-[2px] after:w-full after:bg-white
                after:transition-transform after:duration-300
                hover:after:scale-x-0
              "
            >
              View work
            </button>

            <span className="text-base font-medium text-[#22FF60] drop-shadow-[0_0_12px_rgba(34,255,96,0.8)]">
              Avinash Subramaniyan
            </span>
          </div>
        </div>
      </div>

      {/* sparkle styles */}
      <style jsx>{`
        .cursor-sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(34, 255, 96, 1) 0%,
            rgba(34, 255, 96, 0.4) 40%,
            transparent 70%
          );
          box-shadow: 0 0 10px rgba(34, 255, 96, 0.9);
          transform: translate(-50%, -50%);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
