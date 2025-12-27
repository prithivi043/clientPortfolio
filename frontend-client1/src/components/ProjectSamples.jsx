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
    if (!el || !el.firstChild) return;

    const slideWidth = el.firstChild.getBoundingClientRect().width;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActive(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const scrollToSlide = (index) => {
    const el = sliderRef.current;
    if (!el || !el.firstChild) return;

    const slideWidth = el.firstChild.getBoundingClientRect().width;
    el.scrollTo({ left: slideWidth * index, behavior: "smooth" });
  };

  const prev = () => scrollToSlide(active - 1);
  const next = () => scrollToSlide(active + 1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        })
        .from(".ps-header", { y: 40, opacity: 0 })
        .from(".ps-carousel", { y: 30, opacity: 0 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 py-24 bg-[#050814]"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 ps-header">
          <span className="inline-block px-4 py-1 text-sm text-indigo-400 bg-indigo-500/10 rounded-full">
            CONTENT CREATION
          </span>
          <h2 className="mt-4 text-4xl text-white">PROJECT SAMPLES</h2>
        </div>

        {/* 🔥 RELATIVE WRAPPER (IMPORTANT) */}
        <div className="relative">
          {/* LEFT ARROW */}
          <button
            onClick={prev}
            disabled={active === 0}
            className="
              absolute left-2 top-1/2 -translate-y-1/2
              z-40
              h-10 w-10 flex items-center justify-center
              rounded-full bg-black/70 text-white
              hover:bg-black
              disabled:opacity-30
            "
          >
            ❮
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            disabled={active === slides.length - 1}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              z-40
              h-10 w-10 flex items-center justify-center
              rounded-full bg-black/70 text-white
              hover:bg-black
              disabled:opacity-30
            "
          >
            ❯
          </button>

          {/* CAROUSEL */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="
              ps-carousel
              flex overflow-x-auto snap-x snap-mandatory
              scroll-smooth scrollbar-hide
              pb-10
            "
          >
            {slides.map((group, i) => (
              <SliderPage key={i} videos={group} isActive={active === i} />
            ))}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-3 mt-4">
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => scrollToSlide(i)}
              className={`cursor-pointer h-2 rounded-full transition-all ${
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
