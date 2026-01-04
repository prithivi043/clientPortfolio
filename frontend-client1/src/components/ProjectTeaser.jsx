import { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const ProjectTeaser = () => {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const arrowRef = useRef(null);
  const navigate = useNavigate();

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
        .from(".pt-eyebrow", { y: 20, opacity: 0 })
        .from(".pt-title", { y: 30, opacity: 0 }, "-=0.3")
        .from(".pt-copy", { y: 20, opacity: 0 }, "-=0.4")
        .from(".pt-visual", { scale: 0.92, opacity: 0 }, "-=0.5")
        .from(".pt-cta", { y: 20, opacity: 0 }, "-=0.4");

      // ambient float
      gsap.to(visualRef.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const shootArrow = () => {
    gsap.to(arrowRef.current, {
      x: 420,
      scale: 1.4,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
      boxShadow: "0 0 40px rgba(99,102,241,0.9)",
      onComplete: () => navigate("/projects"),
    });
  };

  return (
    <section
      id="ProjectSamples"
      ref={sectionRef}
      className="relative w-full px-6 py-40 bg-[#050814] overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute left-1/2 -top-40 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-indigo-500/15 blur-[260px]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* LEFT VISUAL — clickable */}
        <div
          ref={visualRef}
          onClick={shootArrow}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && shootArrow()}
          className="pt-visual hidden lg:flex justify-center cursor-pointer"
        >
          <div className="relative w-80 h-80 rounded-full border border-white/10 flex items-center justify-center group">
            {/* orbit rings */}
            <div className="absolute inset-10 rounded-full border border-white/10" />
            <div className="absolute inset-20 rounded-full border border-white/10" />

            {/* core glow */}
            <div className="absolute inset-24 rounded-full bg-indigo-400/25 blur-xl" />

            {/* label */}
            <div className="relative z-10 text-center">
              <p className="text-indigo-400 text-xs tracking-[0.35em] mb-2">
                OPEN PORTFOLIO
              </p>
              <p className="text-white text-lg leading-snug">
                Launch the
                <br />
                case studies
              </p>
            </div>

            {/* ARROW BULLET */}
            <div
              ref={arrowRef}
              className="
                absolute right-6 bottom-6
                w-10 h-10 rounded-full
                bg-indigo-500
                flex items-center justify-center
                text-white
                shadow-[0_0_20px_rgba(99,102,241,0.6)]
              "
            >
              <FiArrowRight />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="max-w-xl">
          <p className="pt-eyebrow text-xs tracking-[0.35em] text-indigo-400 mb-6">
            SELECTED PROJECTS
          </p>

          <h2 className="pt-title text-4xl lg:text-5xl text-white mb-8">
            Proof lives in
            <br />
            execution
          </h2>

          <p className="pt-copy text-gray-400 text-lg leading-relaxed mb-12">
            These projects are built with strategy, precision, and intent. Each
            one demonstrates how visual storytelling can influence perception
            and drive engagement.
          </p>

          <div className="pt-cta">
            <button
              onClick={shootArrow}
              className="
                inline-flex items-center gap-4
                px-9 py-4 rounded-full
                bg-indigo-500 text-white
                hover:bg-indigo-400 transition
                shadow-[0_0_30px_rgba(99,102,241,0.35)]
              "
            >
              View Sample Projects
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectTeaser;
