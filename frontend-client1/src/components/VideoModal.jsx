import { useEffect, useRef } from "react";

const VideoModal = ({ src, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // lock background scroll
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);

      // stop playback cleanly
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/90
        flex items-center justify-center
        px-4
      "
      onClick={onClose}
    >
      {/* close button */}
      <button
        onClick={onClose}
        className="
          absolute top-5 right-5
          text-white text-4xl
          leading-none
          opacity-80 hover:opacity-100
        "
        aria-label="Close video"
      >
        ×
      </button>

      {/* video wrapper (prevents backdrop click) */}
      <div
        className="
          relative
          w-full max-w-4xl
          aspect-video
          rounded-2xl
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="
            w-full h-full
            object-contain
            bg-black
          "
        />
      </div>
    </div>
  );
};

export default VideoModal;
