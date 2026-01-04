import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiPhone, FiCamera } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const cameraRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useLayoutEffect(() => {
    gsap.fromTo(
      footerRef.current.querySelectorAll(".footer-item"),
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      cameraRef.current,
      { x: -200 },
      {
        x: window.innerWidth + 300,
        duration: 30,
        repeat: -1,
        ease: "none",
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050814] px-6 pt-28 pb-24 overflow-hidden"
    >
      {/* CONTENT */}
      <div className="relative z-30 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          {/* BRAND */}
          <div className="footer-item">
            <div className="bg-[#0b1024] border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl text-white mb-4">Avinash Creative</h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Crafting cinematic visuals and structured creative systems that
                communicate clearly and perform consistently.
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="footer-item">
            <div className="bg-[#0b1024] border border-white/10 rounded-xl p-6">
              <h4 className="text-xs text-white tracking-widest mb-6">
                NAVIGATION
              </h4>

              <ul className="space-y-3 text-slate-200 text-sm">
                {[
                  { label: "Home", id: "HeroSection" },
                  { label: "Profile", id: "ProfileSection" },
                  { label: "Skills", id: "SkillsSection" },
                  { label: "Projects", id: "ProjectSamples" },
                  { label: "Contact", id: "ContactForm" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-indigo-400 transition"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div className="footer-item">
            <div className="bg-[#0b1024] border border-white/10 rounded-xl p-6">
              <h4 className="text-xs text-white tracking-widest mb-6">
                CONTACT
              </h4>

              <div className="space-y-3 text-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <FiMail className="text-indigo-400" />
                  avinashpersonal1234@gmail.com
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-indigo-400" />
                  +91 93602 22602
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BAR */}
        <div className="pt-6 border-t border-white/10 text-slate-400 text-xs flex flex-col sm:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Avinash Creative</p>
          <p>Clarity · Motion · Structure</p>
        </div>
      </div>

      {/* CAMERA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[140px] z-10">
        <div ref={cameraRef} className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-400/40 blur-2xl scale-150" />
          <div className="h-16 w-16 rounded-full bg-[#050814] border border-white/20 flex items-center justify-center text-indigo-400 text-2xl">
            <FiCamera />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
