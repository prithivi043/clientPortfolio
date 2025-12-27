import { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";

const SliderPage = ({ videos, isActive }) => {
  const pageRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 }
    );

    if (pageRef.current) observer.observe(pageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={pageRef}
      className={`
        min-w-full snap-center
        flex justify-center gap-6 sm:gap-8
        transition-transform duration-500
        ${isActive ? "scale-100" : "scale-[0.95]"}
      `}
    >
      {videos.map((src, i) => (
        <VideoCard key={i} src={src} canLoad={visible && isActive} />
      ))}
    </div>
  );
};

export default SliderPage;
