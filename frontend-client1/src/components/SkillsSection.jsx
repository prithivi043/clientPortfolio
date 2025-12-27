import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaEnvelope, FaPhoneAlt, FaArrowRight, FaUser } from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobelightroom,
  SiAdobeaftereffects,
  SiAdobepremierepro,
} from "react-icons/si";
import { TbColorSwatch } from "react-icons/tb";

import ResumePDF from "/resume/Avinash-resume.pdf"; // Adjust path to your resume PDF

gsap.registerPlugin(ScrollTrigger);

const ElitePortfolioSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".icon-safe", {
        opacity: 1,
        scale: 1,
        clearProps: "all",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        defaults: {
          ease: "power4.out",
          duration: 1.1,
        },
      });

      tl.from(".elite-card", {
        y: 60,
        opacity: 0,
        stagger: 0.18,
      }).from(
        ".elite-card-inner",
        {
          y: 30,
          opacity: 0,
          stagger: 0.12,
        },
        "-=0.7"
      );

      // hard reset icons AFTER animations complete
      tl.add(() => {
        gsap.set(".icon-safe", {
          opacity: 1,
          scale: 1,
          clearProps: "transform,opacity",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="SkillsSection"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050814] px-6 py-28"
    >
      {/* background glow */}
      <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[160px]" />
      <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-sky-500/15 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl space-y-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* skills */}
          <GlassCard>
            <div className="elite-card-inner mb-5">
              <SectionTitle title="Skills" />
              <p className="mt-3 text-white text-xl font-semibold">
                Design & Creative
              </p>
              <div className="mt-3 h-[1px] w-14 bg-indigo-400/70 rounded-full" />
            </div>

            <div className="elite-card-inner grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Graphic Design",
                "Motion Graphics",
                "Video Editing",
                "Content Creation",
                "Branding",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-300"
                >
                  <span className="h-3 w-3 rounded-full bg-indigo-400 ring-2 ring-indigo-400/30" />
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* software */}
          <GlassCard center>
            <div className="elite-card-inner">
              <SectionTitle title="Software Expertise" />

              <div className="mt-10 grid grid-cols-3 gap-8 place-items-center">
                <IconTile brand="ps">
                  <SiAdobephotoshop />
                </IconTile>
                <IconTile brand="ai">
                  <SiAdobeillustrator />
                </IconTile>
                <IconTile brand="lr">
                  <SiAdobelightroom />
                </IconTile>
                <IconTile brand="ae">
                  <SiAdobeaftereffects />
                </IconTile>
                <IconTile brand="pr">
                  <SiAdobepremierepro />
                </IconTile>
                <IconTile brand="color">
                  <TbColorSwatch />
                </IconTile>
              </div>
            </div>
          </GlassCard>

          {/* resume */}
          <GlassCard center>
            <div className="elite-card-inner">
              <SectionTitle title="Resume" />
              <div className="mt-10 flex flex-col items-center gap-8">
                {/* person icon in the center */}
                <div className="w-36 h-44 rounded-xl border border-white/15 bg-white/10 flex items-center justify-center text-indigo-400 text-6xl">
                  <FaUser />
                </div>

                {/* download resume link */}
                <a
                  href={ResumePDF}
                  download="My_Resume.pdf"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  VIEW RESUME <FaArrowRight />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* contact */}
        <div className="mx-auto max-w-3xl elite-card">
          <GlassCard center>
            <div className="elite-card-inner">
              <SectionTitle title="Contact" />
              <div className="mt-10 space-y-6 text-gray-300 text-lg">
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
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

/* reusable components */

const GlassCard = ({ children, center }) => (
  <div
    className={`elite-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 ${
      center ? "text-center" : ""
    }`}
  >
    {children}
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-indigo-400 text-3xl font-bold tracking-widest">
    {title.toUpperCase()}
  </h2>
);

const IconTile = ({ children, brand }) => {
  const brandStyles = {
    ps: "text-[#31A8FF]",
    ai: "text-[#FF9A00]",
    lr: "text-[#31A8FF]",
    ae: "text-[#9999FF]",
    pr: "text-[#9999FF]",
    color: "text-[#7CFF00]",
  };

  return (
    <div
      className={`icon-safe h-24 w-24 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[36px] ${brandStyles[brand]}`}
    >
      {children}
    </div>
  );
};

const ContactRow = ({ icon, value, link }) => (
  <div className="flex items-center justify-center gap-4">
    {icon}
    <a href={link} className="hover:text-white transition">
      {value}
    </a>
  </div>
);

export default ElitePortfolioSection;
