import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingCameraIcon from "./FloatingCameraIcon";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".camera-icon", { y: -30, opacity: 0, filter: "blur(8px)" })
        .from(
          ".hero-badge",
          { y: 40, opacity: 0, filter: "blur(10px)" },
          "-=0.8"
        )
        .from(
          ".hero-bg-text",
          { scaleY: 0.6, opacity: 0, transformOrigin: "bottom" },
          "-=0.9"
        )
        .from(
          ".hero-foreground",
          { y: 50, opacity: 0, filter: "blur(6px)" },
          "-=0.9"
        )
        .from(".hero-image", { x: 80, opacity: 0, filter: "blur(8px)" }, "-=1");

      gsap.to(".camera-icon", {
        y: -16,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="HeroSection"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-[#050b2c] to-black flex items-center justify-center px-4 overflow-hidden
                 pt-20 lg:pt-0" /* Added padding-top 20px on mobile, 0 on large screens */
    >
      <FloatingCameraIcon />

      <div className="relative w-full max-w-7xl rounded-[28px] border border-white/40 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md overflow-hidden px-6 sm:px-10 py-10 sm:py-12">
        {/* badge */}
        <div className="relative z-30 mb-8 lg:mb-2 lg:mt-10 hero-badge flex justify-center lg:justify-start">
          <span className="relative inline-flex items-center px-6 lg:px-8 py-2.5 rounded-full bg-[#5B6CFF] text-white text-lg lg:text-[25px] font-bold font-[Poppins] shadow-[0_8px_20px_rgba(91,108,255,0.35)]">
            Graphic Design & Video Editing
            <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#5B6CFF] rotate-45 shadow-[0_6px_14px_rgba(91,108,255,0.3)]" />
          </span>
        </div>

        <div className="relative flex flex-col items-center gap-10 lg:block lg:h-[460px]">
          {/* background text */}
          <h1
            className="
              hidden lg:block
              absolute left-0 bottom-44
              z-10
              font-extrabold text-white
              leading-none tracking-tight
              text-[10rem]
              transform scale-y-150 origin-bottom
              select-none pointer-events-none
              hero-bg-text
            "
          >
            PORTFOLIO
          </h1>

          {/* foreground */}
          <div
            className="
              relative z-30
              flex flex-col items-center text-center
              lg:absolute lg:left-12
              lg:top-[65%]
              lg:items-start lg:text-left
              hero-foreground
            "
          >
            <p className="text-white/90 text-2xl sm:text-3xl lg:text-[32px] font-[Poppins] mb-6">
              Avinash Subramaniyan
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("ProjectSamples")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                px-10 py-3
                rounded-full
                font-[Poppins] font-medium
                text-white
                bg-white/10 backdrop-blur-md
                border border-white/30
                shadow-lg
                transition-all duration-300 ease-out
                hover:scale-105 hover:bg-white hover:text-black
                hover:shadow-white/40
                active:scale-95
              "
            >
              Learn More
            </button>
          </div>

          {/* image */}
          <div className="relative z-20 flex justify-center lg:absolute lg:right-0 lg:bottom-0 hero-image">
            <img
              src="/images/hero-image-removebg-preview.png"
              alt="Avinash"
              className="w-56 sm:w-72 lg:h-[520px] lg:w-auto object-contain grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
