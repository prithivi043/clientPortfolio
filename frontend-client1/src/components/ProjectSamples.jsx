import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SliderPage from "./SliderPage";

gsap.registerPlugin(ScrollTrigger);

const ProjectSamples = () => {
  const slides = [
    [
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/1.mp4",
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/2.mp4",
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/3.mp4",
    ],
    [
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/4.mp4",
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/5.mp4",
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/6.mp4",
    ],
    [
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/7.mp4",
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/8.mp4",
      "https://github.com/prithivi043/clientPortfolio/releases/download/portfolio-videos/9.mp4",
    ],
  ];

  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: {
            ease: "power4.out",
            duration: 1,
          },
        })
        .from(".ps-header", { y: 40, opacity: 0 })
        .from(".ps-carousel", { y: 30, opacity: 0 }, "-=0.6")
        .from(
          ".ps-pagination span",
          { scale: 0, opacity: 0, stagger: 0.08 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ProjectSamples"
      ref={sectionRef}
      className="relative w-full px-5 py-28 bg-[#050814] overflow-hidden"
    >
      <div className="absolute -top-48 -left-48 w-[520px] h-[520px] bg-indigo-600/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-48 -right-48 w-[520px] h-[520px] bg-sky-500/20 blur-[180px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-14 ps-header">
          <span className="inline-block px-4 py-1 text-sm tracking-wide text-indigo-400 bg-indigo-500/10 rounded-full">
            CONTENT CREATION
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl text-white tracking-tight">
            PROJECT SAMPLES
          </h2>
        </div>

        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="ps-carousel flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-10"
        >
          {slides.map((group, i) => (
            <SliderPage key={i} videos={group} isActive={active === i} />
          ))}
        </div>

        <div className="ps-pagination flex justify-center items-center gap-3 mt-6">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-indigo-400" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSamples;
