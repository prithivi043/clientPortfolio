import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Counter – GSAP driven */
const Counter = ({ end, trigger, duration = 1.6 }) => {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    gsap.to(valueRef, {
      current: end,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        setValue(Math.floor(valueRef.current));
      },
    });
  }, [trigger, end, duration]);

  return <span>{value}</span>;
};

/* Typewriter */
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

const ProfileSection = () => {
  const sectionRef = useRef(null);
  const [startCounters, setStartCounters] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => setStartCounters(true),
        },
        defaults: {
          duration: 1.2,
          ease: "power4.out",
        },
      });

      tl.from(".profile-image", {
        x: -60,
        opacity: 0,
        filter: "blur(10px)",
      })
        .from(
          ".profile-text",
          {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
          },
          "-=0.8"
        )
        .from(
          ".profile-counter",
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
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
      className="w-full bg-gradient-to-br from-[#050b2c] to-black py-24 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left Image */}
        <div className="flex justify-center lg:justify-start profile-image">
          <div className="rounded-[32px] border border-white/30 p-3 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]">
            <img
              src="src/images/hero-image-removebg-preview.png"
              alt="Avinash Subramaniyan"
              className="rounded-[26px] w-85 sm:w-95 lg:w-105 object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="text-white space-y-6 profile-text">
          <p className="text-[24px] text-white/80 font-[Poppins]">Hi! I’m</p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[Poppins]">
            Avinash Subramaniyan
          </h2>

          <h3 className="text-3xl sm:text-4xl font-semibold font-[Poppins]">
            <span className="text-[#5B6CFF]">I’m a </span>
            <Typewriter
              words={[
                { text: "Creative Designer", color: "text-amber-400" },
                { text: "Video Editor", color: "text-pink-400" },
              ]}
            />
          </h3>

          <ul className="space-y-4 text-white/90 text-[24px] leading-relaxed font-[Poppins] max-w-xl">
            <li className="flex gap-3">
              <span>•</span>
              <span>
                I help brands tell powerful visual stories through design, video
                editing, and content creation.
              </span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>
                From concept to campaign, I bring ideas to life that look great
                and perform even better.
              </span>
            </li>
          </ul>

          {/* Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-xl">
            <div className="profile-counter text-center">
              <p className="text-4xl font-bold font-[Poppins]">
                <Counter end={3} trigger={startCounters} />+
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/70">
                Years of Exp
              </p>
            </div>

            <div className="profile-counter text-center">
              <p className="text-4xl font-bold font-[Poppins]">
                <Counter end={50} trigger={startCounters} />+
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/70">
                Graphic Design
              </p>
            </div>

            <div className="profile-counter text-center">
              <p className="text-4xl font-bold font-[Poppins]">
                <Counter end={500} trigger={startCounters} />+
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/70">
                Video Editing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
