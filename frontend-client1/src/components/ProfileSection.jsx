import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ===================== COUNTER ===================== */
const Counter = ({ end, start, duration = 2.2 }) => {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!start || hasStarted.current) return;

    hasStarted.current = true;
    valueRef.current = Math.floor(-end * 0.15);

    gsap.to(valueRef, {
      current: end,
      duration,
      delay: 0.25,
      ease: "power2.inOut",
      onUpdate: () => {
        setValue(Math.max(0, Math.floor(valueRef.current)));
      },
    });
  }, [start, end, duration]);

  return <span>{value}</span>;
};

/* ===================== TYPEWRITER ===================== */
const Typewriter = ({ words, speed = 90, pause = 1400 }) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex].text;
    let timeout;

    if (!isDeleting && text.length < currentWord.length) {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length + 1)),
        speed
      );
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        speed / 2
      );
    } else if (!isDeleting && text.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return (
    <span className={`border-r-2 pr-1 animate-pulse ${words[wordIndex].color}`}>
      {text}
    </span>
  );
};

/* ===================== PROFILE SECTION ===================== */
const ProfileSection = () => {
  const sectionRef = useRef(null);
  const startCountersRef = useRef(false);
  const [, forceRender] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              startCountersRef.current = true;
              forceRender((v) => !v);
            },
          },
        })
        .from(".profile-image", {
          x: -60,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          ".profile-text",
          {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .from(
          ".profile-counter",
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ProfileSection"
      ref={sectionRef}
      className="relative w-full py-24 px-6 overflow-hidden"
    >
      {/* gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070a2e] via-[#050814] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(91,108,255,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,180,90,0.12),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* image */}
        <div className="relative group perspective-[1400px] w-82 sm:w-80 lg:w-88 mx-auto">
          <div className="relative rounded-[36px] p-[1.5px] bg-gradient-to-br from-[#10B981]/50 via-transparent to-[#22FF60]/30 transform-gpu preserve-3d transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-x-6 group-hover:rotate-y-[-6deg] animate-[float_6s_ease-in-out_infinite] w-full">
            <div className="relative rounded-[34px] bg-[#050814]/85 backdrop-blur-xl p-4 border border-white/10 transform-gpu preserve-3d transition-transform duration-500 ease-out group-hover:translate-z-10 w-full">
              <div className="relative rounded-[28px] overflow-hidden transform-gpu preserve-3d transition-transform duration-300 ease-out group-hover:translate-z-20 w-full">
                <img
                  src="/images/hero-image-removebg-preview.png"
                  alt="Video Editor"
                  className="object-cover w-full"
                />

                {/* Light Sweep */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -left-2/3 top-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[220%] transition-all duration-[2200ms] ease-[cubic-bezier(.22,1,.36,1)]" />
                </div>

                {/* Timeline / other optional elements */}
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="text-white space-y-6 profile-text">
          <p className="text-[20px] text-white/75 font-[Poppins]">Hello, I’m</p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[Poppins]">
            Avinash Subramaniyan
          </h2>

          <h3 className="text-3xl sm:text-4xl font-semibold font-[Poppins]">
            <span className="text-[#5B6CFF]">Working as a </span>
            <Typewriter
              words={[
                { text: "Creative Designer", color: "text-amber-400" },
                { text: "Video Editor", color: "text-pink-400" },
              ]}
            />
          </h3>

          <ul className="space-y-4 text-white/90 text-[21px] leading-relaxed font-[Poppins] max-w-xl">
            <li className="flex gap-3">
              <span>•</span>
              <span>
                I collaborate closely with clients to clearly understand their
                goals, audience, and expectations before any creative work
                begins.
              </span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>
                Each project follows a structured process with transparent
                communication, realistic timelines, and consistent updates.
              </span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>
                The focus is always on delivering visuals that feel reliable,
                professional, and aligned with long-term brand growth.
              </span>
            </li>
          </ul>

          {/* counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-xl">
            <div className="profile-counter text-center">
              <p className="text-4xl font-bold font-[Poppins]">
                <Counter end={3} start={startCountersRef.current} />+
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/65">
                Years of Experience
              </p>
            </div>

            <div className="profile-counter text-center">
              <p className="text-4xl font-bold font-[Poppins]">
                <Counter end={50} start={startCountersRef.current} />+
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/65">
                Client Projects Completed
              </p>
            </div>

            <div className="profile-counter text-center">
              <p className="text-4xl font-bold font-[Poppins]">
                <Counter end={500} start={startCountersRef.current} />+
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/65">
                Videos Delivered Successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
