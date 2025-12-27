import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiPhone, FiPlay } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.12,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050814] px-6 pt-20 pb-10 overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-indigo-600/15 blur-[200px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 border-b border-white/10 pb-14">
          {/* brand */}
          <div className="footer-item space-y-4">
            <h3 className="text-2xl text-white tracking-tight">
              Avinash <span className="text-indigo-400">Creative</span>
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Crafting cinematic visuals, powerful edits, and creative stories
              that elevate brands and creators.
            </p>

            <div className="flex items-center gap-2 text-indigo-400 text-sm">
              <FiPlay />
              Visual storytelling studio
            </div>
          </div>

          {/* navigation */}
          <div className="footer-item">
            <h4 className="text-white mb-4 tracking-wide">Quick Links</h4>

            <ul className="space-y-3 text-slate-400 text-sm">
              <li
                onClick={() => scrollToSection("HeroSection")}
                className="cursor-pointer hover:text-white transition"
              >
                Home
              </li>
              <li
                onClick={() => scrollToSection("ProjectSamples")}
                className="cursor-pointer hover:text-white transition"
              >
                Projects
              </li>
              <li
                onClick={() => scrollToSection("SkillsSection")}
                className="cursor-pointer hover:text-white transition"
              >
                Skills
              </li>
              <li
                onClick={() => scrollToSection("ProfileSection")}
                className="cursor-pointer hover:text-white transition"
              >
                About
              </li>
              <li
                onClick={() => scrollToSection("ContactForm")}
                className="cursor-pointer hover:text-white transition"
              >
                Contact
              </li>
            </ul>
          </div>

          {/* contact */}
          <div className="footer-item">
            <h4 className="text-white mb-4 tracking-wide">Get in Touch</h4>

            <div className="space-y-3 text-slate-400 text-sm">
              <div className="flex items-center gap-2 hover:text-white transition">
                <FiMail className="text-indigo-400" />
                avinashpersonal1234@gmail.com
              </div>

              <div className="flex items-center gap-2 hover:text-white transition">
                <FiPhone className="text-indigo-400" />
                +91 93602 22602
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="footer-item mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()} Avinash Creative. All rights reserved.
          </p>
          <p className="tracking-wide">Designed & edited with precision</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
