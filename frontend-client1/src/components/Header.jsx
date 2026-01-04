import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  const navItems = [
    { label: "Home", id: "HeroSection" },
    { label: "Profile", id: "ProfileSection" },
    { label: "Skills", id: "SkillsSection" },
    { label: "Collaboration", id: "Collaborations" },
    { label: "Projects", id: "ProjectSamples" },
    { label: "Contact", id: "ContactForm" },
  ];

  return (
    <header className=" fixed top-0 left-0 w-full z-50">
      {/* GLASS GRADIENT BAR */}
      <div
        className="
          relative
          bg-gradient-to-r
          from-indigo-500/10
          via-cyan-400/5
          to-purple-500/10
          backdrop-blur-2xl
          backdrop-saturate-150
          border-b border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        "
      >
        {/* top glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
          {/* BRAND */}
          <div
            onClick={() => scrollToSection("HeroSection")}
            className="flex items-center cursor-pointer select-none mx-auto md:mx-0"
          >
            <span className="text-white text-xl font-semibold tracking-wide">
              Avinash
            </span>
            <span className="ml-2 text-indigo-400 text-xl font-semibold">
              Subramaniyan
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-12 text-base text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="
                  relative font-medium transition
                  hover:text-white
                  after:absolute after:-bottom-1.5 after:left-0
                  after:h-[2px] after:w-0
                  after:bg-indigo-400 after:transition-all
                  hover:after:w-full
                "
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden text-white text-2xl
              absolute right-6
              flex items-center justify-center
              w-11 h-11
              transition active:scale-95
            "
            aria-label="Toggle navigation"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            md:hidden
            bg-gradient-to-b
            from-indigo-500/15
            to-[#050814]/90
            backdrop-blur-2xl
            backdrop-saturate-150
            border-b border-white/10
          "
        >
          <nav
            className="
              max-w-7xl mx-auto
              px-6 py-12
              flex flex-col items-center
              gap-8
              text-slate-300 text-xl
            "
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="
                  relative font-medium
                  transition
                  hover:text-white
                  active:scale-95
                  after:absolute after:-bottom-2 after:left-1/2
                  after:-translate-x-1/2
                  after:h-[2px] after:w-0
                  after:bg-indigo-400
                  after:transition-all
                  hover:after:w-10
                "
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
