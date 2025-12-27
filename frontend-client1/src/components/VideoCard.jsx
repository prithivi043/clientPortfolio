import { useEffect, useRef, useState } from "react";
import VideoModal from "./VideoModal";

const VideoCard = ({ src, canLoad }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!canLoad || loaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          const video = videoRef.current;
          video.src = src;
          video.preload = "metadata";
          video.load();
          video.play().catch(() => {});
          setLoaded(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [canLoad, loaded, src]);

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setOpen(true)}
        className="
          relative
          w-[240px] sm:w-[280px]
          aspect-[9/19.5]
          max-h-[420px] sm:max-h-none
          rounded-[38px]
          bg-[#0b0f1f]
          shadow-[0_40px_100px_-25px_rgba(0,0,0,0.9)]
          cursor-pointer
          transition-transform duration-300
          active:scale-[0.97]
        "
      >
        <div
          className="
            absolute inset-[7px]
            rounded-[30px]
            overflow-hidden
            bg-black
          "
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        </div>

        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[5px] w-[56px] rounded-full bg-black/60" />
        <div className="absolute left-[-3px] top-[90px] h-[34px] w-[3px] rounded-full bg-slate-600" />
        <div className="absolute left-[-3px] top-[132px] h-[34px] w-[3px] rounded-full bg-slate-600" />
        <div className="absolute right-[-3px] top-[110px] h-[46px] w-[3px] rounded-full bg-slate-600" />
        <div className="pointer-events-none absolute inset-0 rounded-[38px] ring-1 ring-white/10" />
      </div>

      {open && <VideoModal src={src} onClose={() => setOpen(false)} />}
    </>
  );
};

export default VideoCard;
