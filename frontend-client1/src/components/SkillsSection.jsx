import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiCamera, FiVideo, FiImage } from "react-icons/fi";
import { TbAperture } from "react-icons/tb";
import {
  FaPlay,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaUser,
} from "react-icons/fa";

import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobelightroom,
  SiAdobeaftereffects,
  SiAdobepremierepro,
} from "react-icons/si";

import ResumePDF from "/resume/Avinash-resume.pdf";

gsap.registerPlugin(ScrollTrigger);

const ElitePortfolioSection = () => {
  const coreRef = useRef(null);
  const expertiseRef = useRef(null);

  const centerCameraRef = useRef(null);
  const orbitInnerRef = useRef(null);
  const orbitOuterRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(centerCameraRef.current, {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(orbitInnerRef.current, {
        rotate: 360,
        duration: 42,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(orbitOuterRef.current, {
        rotate: -360,
        duration: 78,
        repeat: -1,
        ease: "linear",
      });

      gsap.from(".expertise-icon", {
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: "top 75%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ================= CORE SKILLS ================= */}
      <section
        id="SkillsSection"
        ref={coreRef}
        className="relative w-full bg-[#02030a] px-6 py-28 lg:py-32 overflow-hidden"
      >
        {/* background field */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#02030a] via-[#040620] to-[#02030a]" />

          {/* shared glow anchor */}
          <div className="absolute left-[48%] top-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-indigo-500/18 blur-[220px]" />
        </div>

        <div
          className="
      relative
      max-w-6xl
      mx-auto
      grid
      grid-cols-1
      lg:grid-cols-[1fr_0.9fr]
      gap-10
      lg:gap-12
      items-center
    "
        >
          {/* LEFT — text */}
          <div className="relative z-10 max-w-xl">
            <p className="text-xs tracking-[0.4em] text-indigo-400 mb-4">
              CORE SKILLS
            </p>

            <h2 className="text-4xl lg:text-5xl text-white mb-10 leading-tight">
              Design & Creative
            </h2>

            <ul className="space-y-7 text-gray-300 text-lg">
              {[
                "Graphic Design",
                "Motion Graphics",
                "Video Editing",
                "Content Creation",
                "Branding",
              ].map((skill, i) => (
                <li
                  key={skill}
                  className="group relative pl-14 flex items-center"
                >
                  {/* rail */}
                  <span className="absolute left-1 top-0 bottom-0 w-px bg-white/10" />

                  {/* node */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(99,102,241,0.9)] transition-transform duration-300 group-hover:scale-125" />

                  {/* connector */}
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 h-px w-8 bg-indigo-400/40" />

                  <span className="relative z-10 group-hover:text-white transition">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>

            {/* directional energy */}
            <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-px w-24 bg-gradient-to-r from-indigo-400/40 to-transparent" />
          </div>

          {/* RIGHT — orbit visually pulled into text */}
          <div className="relative hidden lg:flex justify-start">
            <div className="relative w-72 h-72 flex items-center justify-center -translate-x-14">
              {/* outer orbit */}
              <div
                ref={orbitOuterRef}
                className="absolute inset-0 rounded-full"
              >
                <OrbitIcon position="top" icon={<FiVideo />} />
                <OrbitIcon position="right" icon={<FiImage />} />
                <OrbitIcon position="bottom" icon={<FaPlay />} />
              </div>

              {/* inner orbit */}
              <div
                ref={orbitInnerRef}
                className="absolute inset-9 rounded-full"
              >
                <OrbitIcon position="left" icon={<TbAperture />} />
                <OrbitIcon position="top" icon={<FiCamera />} />
              </div>

              {/* core */}
              <div
                ref={centerCameraRef}
                className="
            relative z-10
            w-18 h-18
            rounded-full
            bg-white/5
            border border-white/15
            flex items-center justify-center
            text-indigo-400 text-3xl
            shadow-[0_0_40px_rgba(99,102,241,0.55)]
          "
              >
                <FiCamera />
              </div>

              {/* depth + bind glow */}
              <div className="absolute inset-0 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE SECTION ================= */}
      <section
        ref={expertiseRef}
        className="relative w-full min-h-screen bg-[#02020a] px-6 py-40 overflow-hidden"
      >
        {/* animated gradient waves */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#02020a] via-[#070b2c] to-[#02020a]" />

          <div className="absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-[220px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-sky-400/20 blur-[260px] animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute -bottom-40 left-10 h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[240px] animate-[pulse_12s_ease-in-out_infinite]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* heading */}
          <div className="max-w-xl mb-28">
            <p className="text-xs tracking-[0.4em] text-sky-400 mb-6">
              EXPERTISE
            </p>
            <h2 className="text-4xl lg:text-5xl text-white leading-tight">
              Software & Execution
            </h2>
            <p className="mt-6 text-gray-400 max-w-md">
              Tools I use to transform ideas into polished, production-ready
              visuals.
            </p>
          </div>

          {/* flowing signal line */}
          <div className="relative mb-32">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />

            <div className="relative flex flex-wrap lg:flex-nowrap items-center justify-between gap-16">
              {[
                {
                  icon: <SiAdobephotoshop />,
                  label: "Photoshop",
                  color: "#31A8FF",
                },
                {
                  icon: <SiAdobeillustrator />,
                  label: "Illustrator",
                  color: "#FF9A00",
                },
                {
                  icon: <SiAdobelightroom />,
                  label: "Lightroom",
                  color: "#31A8FF",
                },
                {
                  icon: <SiAdobeaftereffects />,
                  label: "After Effects",
                  color: "#9999FF",
                },
                {
                  icon: <SiAdobepremierepro />,
                  label: "Premiere Pro",
                  color: "#9999FF",
                },
              ].map((tool) => (
                <div
                  key={tool.label}
                  className="tool-icon group relative flex flex-col items-center gap-6"
                >
                  <div
                    className="relative h-24 w-24 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md flex items-center justify-center text-[42px] transition-all duration-500 group-hover:-translate-y-2"
                    style={{ color: tool.color }}
                  >
                    {tool.icon}

                    {/* glow ring */}
                    <span
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `0 0 40px ${tool.color}66`,
                      }}
                    />

                    {/* node */}
                    <span
                      className="absolute -bottom-4 h-3 w-3 rounded-full"
                      style={{
                        background: tool.color,
                        boxShadow: `0 0 18px ${tool.color}`,
                      }}
                    />
                  </div>

                  <p className="text-sm tracking-wide text-gray-300 group-hover:text-white transition">
                    {tool.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* connect terminal */}
          <div className="relative mt-40 flex justify-center expertise-terminal">
            <div className="absolute inset-0 flex justify-center">
              <div className="h-[440px] w-[440px] rounded-full bg-gradient-to-br from-purple-500/25 via-indigo-500/15 to-emerald-500/25 blur-[180px]" />
            </div>

            <div className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl px-10 py-16 text-center">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
              <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.9)]" />

              <p className="text-xs tracking-[0.4em] text-indigo-400 mb-4">
                LET’S CONNECT
              </p>
              <h3 className="text-3xl sm:text-4xl text-white mb-12">
                Ready to work together
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
                <div className="flex flex-col items-center">
                  <p className="text-xs tracking-[0.35em] text-purple-400 mb-4">
                    PROFILE
                  </p>

                  <a
                    href={ResumePDF}
                    download="My_Resume.pdf"
                    className="group inline-flex items-center gap-4 text-lg text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <span className="relative w-14 h-16 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-purple-400 text-xl group-hover:scale-110 transition-transform">
                      <FaUser />
                    </span>
                    View Resume
                    <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-xs tracking-[0.35em] text-emerald-400 mb-4">
                    CONTACT
                  </p>

                  <div className="space-y-5 text-lg text-gray-300">
                    <ContactRow
                      icon={<FaEnvelope className="text-sky-400 text-xl" />}
                      value="avinashpersonal1234@gmail.com"
                      link="mailto:avinashpersonal1234@gmail.com"
                    />
                    <ContactRow
                      icon={<FaPhoneAlt className="text-emerald-400 text-xl" />}
                      value="+91 93602 22602"
                      link="tel:+919360222602"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const OrbitIcon = ({ icon, position }) => {
  const positions = {
    top: "top-0 left-1/2 -translate-x-1/2",
    right: "right-0 top-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2",
    left: "left-0 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`absolute ${positions[position]} w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.45)]`}
    >
      {icon}
    </div>
  );
};

const ContactRow = ({ icon, value, link }) => (
  <div className="flex items-center gap-4">
    {icon}
    <a href={link} className="hover:text-white transition">
      {value}
    </a>
  </div>
);

export default ElitePortfolioSection;
