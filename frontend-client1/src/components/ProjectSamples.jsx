import { useRef, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowLeft } from "react-icons/fi";
import SliderPage from "./SliderPage";

gsap.registerPlugin(ScrollTrigger);

const ProjectSamples = () => {
  const navigate = useNavigate();

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
  const backBtnRef = useRef(null);
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

  const handleBack = () => {
    gsap.to(sectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => navigate("/"),
    });
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
        })
        .from(".ps-back", { y: -20, opacity: 0 })
        .from(".ps-header", { y: 40, opacity: 0 })
        .from(".ps-intro", { y: 30, opacity: 0 }, "-=0.5")
        .from(".ps-carousel", { y: 30, opacity: 0 }, "-=0.4");

      const btn = backBtnRef.current;
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          x: -6,
          boxShadow: "0 0 30px rgba(99,102,241,0.6)",
          duration: 0.3,
          ease: "power3.out",
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.3,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 py-28 bg-[#050814] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* BACK BUTTON */}
        <div className="ps-back mb-10">
          <button
            ref={backBtnRef}
            onClick={handleBack}
            className="
              inline-flex items-center gap-3
              px-5 py-2 rounded-full
              text-indigo-400 text-sm
              border border-indigo-400/30
              bg-indigo-500/10
              transition
            "
          >
            <FiArrowLeft />
            Back to Overview
          </button>
        </div>

        {/* HEADER */}
        <div className="mb-10 ps-header">
          <span className="inline-block px-4 py-1 text-sm text-indigo-400 bg-indigo-500/10 rounded-full">
            CONTENT CREATION
          </span>
          <h2 className="mt-4 text-4xl text-white">PROJECT SAMPLES</h2>
        </div>

        {/* INSPIRATIONAL CONTENT */}
        <div className="ps-intro max-w-3xl mb-16">
          <p className="text-gray-300 text-xl leading-relaxed mb-6">
            Every project you see here is more than a visual outcome.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            These samples represent real creative decisions — understanding the
            message, shaping the narrative, and executing with clarity. My focus
            is not just how a project looks, but how effectively it communicates
            and connects with its audience.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-16 bg-indigo-400/60" />
            <span className="text-indigo-400 text-sm tracking-widest">
              SELECTED EXECUTIONS
            </span>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="relative">
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
